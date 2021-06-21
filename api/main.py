import os
import datetime as DT
import dateutil.relativedelta as REL
from flask import Flask, jsonify, request, abort
from sqlalchemy import *
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from email_client import send_confirmation_email, send_booking_email

####################################
#  Environment variables           #
####################################
POSTGRES_DB = os.environ.get('POSTGRES_DB')
POSTGRES_USER = os.environ.get('POSTGRES_USER')
POSTGRES_PASSWORD = os.environ.get('POSTGRES_PASSWORD')
DATABASE_ADDRESS = os.environ.get('DATABASE_ADDRESS') # Defined by network in docker-compose
DATABASE_URI = ''
PRODUCTION = False

# Use postgresql if in production
if not POSTGRES_DB or not POSTGRES_USER or not POSTGRES_PASSWORD or not DATABASE_ADDRESS:    
    DATABASE_URI = 'sqlite:///local.db'
    PRODUCTION = False
else:
    DATABASE_URI = 'postgresql://{}:{}@{}/{}'.format(POSTGRES_USER, POSTGRES_PASSWORD, DATABASE_ADDRESS, POSTGRES_DB)
    PRODUCTION = True

def main_setup():
    global engine
    engine = create_engine(DATABASE_URI)

def search_hawker(language_query, region_query):
    """
    Searches database for any hawker who matches any combination of language and region provided.

    Parameters:
    language_query ([str]): List of languages to search for
    region_query ([str]): List of languages to search for

    Returns:
    [{'id': str,
      'storeName': str,
      'location' : str
      'language' : str}] : List of hawkers with specified information in a dict. 

    """
    metadata = MetaData()
    hawker_table = Table('hawker', metadata, autoload_with=engine)

    # Create multiple queries to match on the cross product of languages and regions
    # Ensure that we don't return any hawkers who are already assigned to volunteers.
    all_queries = []
    for language in language_query:
        for region in region_query:
            all_queries.append(select(['*']).where(and_(hawker_table.c.region == region, hawker_table.c.languages.contains(language), hawker_table.c.assigned == 0)))
    unionized = union(*all_queries)

    hawkers = []
    with Session(engine) as session:
        result = session.execute(unionized)
        
        if result.rowcount != 0:
            for acc in result:
                hawkers.append({'id': acc.id,
                                'storeName': acc.sname,
                                'location': acc.hawker_centre,
                                'language': acc.languages})

    return hawkers

def search_booking(weeks_in_advance, max_number_per_booking):
    """
    Searches database for available booking slots. Currently assumes that slots
    are only available at 3pm on Saturdays and Sundays.

    Parameters:
    weeks_in_advance (int): Number of weeks in advance to search for
    max_number_per_booking (int): Maximum number of slots allowed per booking

    Returns:
    [{'startTime': str,
      'availability': int}] : List of available slots, with startTime formatted
                              according to ISO 8601
    """
    booking_metadata = MetaData()
    booking_table = Table('booking', booking_metadata, autoload_with=engine)

    # Create datetime objects to use in query
    today = DT.date.today()
    booking_counts = []
    
    with Session(engine) as session:
        for week in range(weeks_in_advance):
            # Calculate datetimes for sat, sun and mon per week
            sat_midnight = today + REL.relativedelta(days=1 + week * 7, weekday=REL.SA)
            sun_midnight = sat_midnight + REL.relativedelta(days=1)
            mon_midnight = sun_midnight + REL.relativedelta(days=1)

            # Create queries on a per-week version
            this_sat_query = select(['*']).where(and_(booking_table.c.datetime > sat_midnight, booking_table.c.datetime < sun_midnight))
            this_sun_query = select(['*']).where(and_(booking_table.c.datetime > sun_midnight, booking_table.c.datetime < mon_midnight))

            # Actually query database and build json return object
            # Assume here that slots are only available at 3pm on every sat and sun
            booking_counts.append({'startTime': (sat_midnight + REL.relativedelta(hours=15)).isoformat(),
                                'availability': max_number_per_booking - len(session.execute(this_sat_query).all())})
            booking_counts.append({'startTime': (sun_midnight + REL.relativedelta(hours=15)).isoformat(),
                                'availability': max_number_per_booking - len(session.execute(this_sun_query).all())})

    return booking_counts

def submit_new_hawker(hawker_name, store_name, hawker_phone_number, reason_for_help, languages, hawker_centre, address, region):
    """
    Add new hawker details to the database.

    Parameters:
    hawker_name (str): Name of hawker
    store_name (str): Hawker's store name
    hawker_phone_number (str): Phone number of hawker
    reason_for_help (str): A short text describing why the hawker needs help
    languages ([str]): List of languages this hawker speaks
    hawker_centre (str): Name of hawker centre store is located at
    address (str): Actual address of store
    region (str): North|South|East|West|Central

    Returns:
    int : 0 if adding to database is successful
          1 if adding to database fails due to table constraints
    """

    metadata = MetaData()
    hawkers_table = Table('hawker', metadata, autoload_with=engine)

    stmt = insert(hawkers_table).values(
        hname=hawker_name,
        sname=store_name, 
        phone_number=hawker_phone_number,
        reason_for_help=reason_for_help,
        languages=languages, 
        hawker_centre=hawker_centre,
        address=address,
        region=region,
        assigned=0)

    try:
        with Session(engine) as session:
            session.execute(stmt)
            session.commit()
    except IntegrityError:
        return 1

    return 0

def volunteer_signup(name, email, phone_number, availability, comfortable, languages, hawker_ids):
    """
    Attempts to match a volunteer to a hawker. If successful, add volunteer's details to database.

    Parameters:
    name (str): Name of volunteer
    email (str): Email of volunteer
    phone_number (str): Phone number of volunteer
    comfortable (str): Whether the volunteer wants to help other hawkers not matched by their criteria 
    availability (str): Comma-seperated values of datetimes the volunteer is available
    languages ([str]): List of languages this volunteer speaks
    hawker_ids ([int]): List of hawker ids (as defined in the database) the volunteer intends to support
    
    Returns:
    int : 0 if adding volunteer details to database is successful
          1 if adding to database fails due to table constraints
          2 if failed to find a suitable hawker for this volunteer
    """
    hawker_metadata = MetaData()
    hawkers_table = Table('hawker', hawker_metadata, autoload_with=engine)
    
    volunteer_metadata = MetaData()
    volunteers_table = Table('volunteer', volunteer_metadata, autoload_with=engine)

    # Try to match hawker to volunteer
    result = ''
    with Session(engine) as session:
        search_stmt = select(['*']).where(and_(hawkers_table.c.id.in_(hawker_ids), hawkers_table.c.assigned != 1))
        result = session.execute(search_stmt).first()
        
        if not result:
            # Else find another hawker for the volunteer randomly
            if comfortable == "Yes":
                search_stmt = select(['*']).where(hawkers_table.c.assigned == 0)
                result = session.execute(search_stmt).first()

    # If the hawker requested has already been taken and volunteer does not want
    # to be matched with other hawkers, return 2
    if not result:
        return 2

    # First cast our comfortable var to same type as the database, int
    if comfortable == "Yes":
        comfortable = 1
    else:
        comfortable = 0

    matched_hawker = result.hname

    update_stmt = update(hawkers_table).where(hawkers_table.c.hname == matched_hawker).values(assigned=1)
    insert_stmt = insert(volunteers_table).values(
        vname=name,
        email=email,
        availability=availability,
        phone_number=phone_number,
        comfortable=comfortable,
        languages=languages,
        hname=matched_hawker)
    search_stmt = select([column('id')]).where(volunteers_table.c.vname == name)

    try:
        with Session(engine) as session:
            session.execute(update_stmt)
            session.execute(insert_stmt)
            session.commit()

        # Only send email if this is in production
        if PRODUCTION:
            vid = session.execute(search_stmt).first().id
            send_confirmation_email(email, vid, name, matched_hawker, result.sname, result.address, result.phone_number, result.reason_for_help)
        
    except IntegrityError:
        return 1

    return 0

def book_training(id, start_time):
    """
    Attempts to add a booking to the database for a volunteer.

    Parameters:
    id (str): id of volunteer (as defined in the database)
    start_time (str): Start time of requested slot, as defined by ISO 8601
    
    Returns:
    int : 0 if adding volunteer's booking slot to database is successful
          1 if adding to database fails due to table constraints
          2 if failed to find a suitable hawker for this volunteer
    """
    booking_metadata = MetaData()
    booking_table = Table('booking', booking_metadata, autoload_with=engine)

    volunteer_metadata = MetaData()
    volunteer_table = Table('volunteer', volunteer_metadata, autoload_with=engine)

    # Craft statements for checking, updating and inserting
    check_stmt = select(['*']).where(booking_table.c.vid == id)
    update_stmt = update(booking_table).where(booking_table.c.vid == id).values(datetime=start_time)
    insert_stmt = insert(booking_table).values(
        datetime=start_time,
        vid=id
    )

    volunteer_data_stmt = select([column('vname'), column('email')]).where(volunteer_table.c.id == id)

    try:
        with Session(engine) as session:
            results = session.execute(check_stmt).all()

            # Update user's booking if already exists, if not insert new one
            if results:
                session.execute(update_stmt)
            else:
                session.execute(insert_stmt)
            
            session.commit()
            
    except IntegrityError:
        return 1

    if PRODUCTION:
        volunteer_data = session.execute(volunteer_data_stmt).first()
        send_booking_email(volunteer_data.email, id, volunteer_data.vname, start_time)

    return 0