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
    metadata = MetaData()
    hawker_table = Table('hawker', metadata, autoload_with=engine)

    # Create multiple queries to match on the cross product of languages and regions
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
        return "2"

    return jsonify(success=True)

def volunteer_signup(name, email, phone_number, availability, comfortable, languages, hawker_ids):
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
        return "2"

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
        # if PRODUCTION:
            vid = session.execute(search_stmt).first().id
            send_confirmation_email(email, vid, name, matched_hawker, result.sname, result.address, result.phone_number, result.reason_for_help)
        
    except IntegrityError:
        return "3"

    return "0"

def book_training(id, start_time):

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

    with Session(engine) as session:
        results = session.execute(check_stmt).all()

        # Update user's booking if already exists, if not insert new one
        if results:
            session.execute(update_stmt)
        else:
            session.execute(insert_stmt)
        
        session.commit()

        if PRODUCTION:
            volunteer_data = session.execute(volunteer_data_stmt).first()
            send_booking_email(volunteer_data.email, id, volunteer_data.vname, start_time)

    return "0"