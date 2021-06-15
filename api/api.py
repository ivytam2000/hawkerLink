import time
import os
import re
from flask import Flask, jsonify, request, abort
from sqlalchemy import *
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from email_client import send_email

# Environment variables
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

# Set up database and flask app
app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

@app.before_first_request
def setup():
    global engine
    engine = create_engine(DATABASE_URI)

@app.route('/time')
def get_current_time():
    """
    Returns the current time as a sanity check for the backend.
    """
    return {'time': time.time()}

@app.route('/hawkers', methods=['POST'])
def get_hawkers():
    """
    Receives POST requests in the following format:
        {
            'languages': [...]
            'regions': [...]
        }

    Returns a json file in the following format:
        [{'id': id,
          'storeName': name,
          'location': loc,
          'languages': [lang1, lang2]}]
    """
    if not request.json:
        abort(400)
    language_query = request.json['languages']
    region_query = request.json['region']

    metadata = MetaData()
    hawker_table = Table('hawker', metadata, autoload_with=engine)

    # Create multiple queries to match on the cross product of languages and regions
    all_queries = []
    for language in language_query:
        for region in region_query:
            print(language, region)
            all_queries.append(select(['*']).where(and_(hawker_table.c.region == region, hawker_table.c.languages.contains(language))))

    unionized = union(*all_queries)

    result = []
    hawkers = []

    with Session(engine) as session:
        result = session.execute(unionized)
        
        for acc in result:
            hawkers.append({'id': acc.id,
                            'storeName': acc.sname,
                            'location': acc.hawker_centre,
                            'language': acc.languages})

    return jsonify(hawkers)



@app.route('/suggest-hawker', methods=['POST'])
def suggest_hawker():
    """
    Receives POST requests in the following format:
        {
            'storeName': string,
            'hawkerCentre': string,
            'address': string,
            'hawkerName': string,
            'hawkerPhoneNumber': string, 
            'languages': [string],
            'reasonForHelp'; string,
            'region' : string (North|South|East|West|Central)
        }

    Returns "0" on success, "1" if input json is malformed,
    "2" if an existing entry already exists in the database.
    TODO: change to http error codes
    """

    if not request.json:
        abort(400)

    try:
        store_name = request.json['storeName']
        hawker_centre = request.json['hawkerCentre']
        address = request.json['address']
        hawker_name = request.json['hawkerName']
        hawker_phone_number = request.json['hawkerPhoneNumber']
        region = request.json['region']
        reason_for_help = request.json['reasonForHelp']
        languages = ", ".join(request.json['languages']) # Concat into a single string
    except KeyError as e:
        return "1"

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

    return "0"

@app.route('/assist-hawker', methods=['POST'])
def assist_hawker():
    """
    Receives POST requests in the following format:
        {
            'name': string,
            'email': string,
            'phoneNumber': string,
            'availability': [string],
            'comfortable': string, 
            'languages': [string],
            'hawkerIds': string
        }

    Returns "0" on success, "1" if input json is malformed,
    "2" if a suitable hawker cannot be found
    "3" if an existing entry already exists in the database.
    TODO: change to http error codes
    """

    if not request.json:
        abort(400)

    try:
        name = request.json['name']
        email = request.json['email']
        phoneNumber = request.json['number']
        availability = ", ".join(request.json['availability'])
        comfortable = request.json['comfortable']
        languages = ", ".join(request.json['languages']) # Concat into a single string
        hawkerIds = request.json['hawkerIds']
    except KeyError as e:
        return "1"

    hawker_metadata = MetaData()
    hawkers_table = Table('hawker', hawker_metadata, autoload_with=engine)
    
    volunteer_metadata = MetaData()
    volunteers_table = Table('volunteer', volunteer_metadata, autoload_with=engine)

    # Attempt to parse hawkerIds
    ids_list = hawkerIds.split(",")
    re_pattern = re.compile(r"""
        (\d+) # Match any number of digits for hawker id
        .*    # Ignore any hawker store name
        """, re.VERBOSE)

    clean_ids_list = []
    for id_ in ids_list:    
        find = re.search(re_pattern, id_)
        hawker_id = find.group(1) if find != None else None
        clean_ids_list.append(hawker_id)

    # Try to match hawker to volunteer
    matched_hawker = ''
    with Session(engine) as session:
        search_stmt = select([column('hname')]).where(and_(hawkers_table.c.id.in_(clean_ids_list), hawkers_table.c.assigned != 1))
        result = session.execute(search_stmt).first()
        
        if result:
            matched_hawker = result[0]
        else:
            # Else find another hawker for the volunteer randomly
            if comfortable == "Yes":
                search_stmt = select([column('hname')]).where(hawkers_table.c.assigned == 0)
                result = session.execute(search_stmt).first()

                if result:
                    matched_hawker = result[0]

    # If the hawker requested has already been taken and volunteer does not want
    # to be matched with other hawkers, return 2
    if not matched_hawker:
        return "2"

    # First cast our comfortable var to same type as the database, int
    if comfortable == "Yes":
        comfortable = 1
    else:
        comfortable = 0

    update_stmt = update(hawkers_table).where(hawkers_table.c.hname == matched_hawker).values(assigned=1)
    
    insert_stmt = insert(volunteers_table).values(
        vname=name,
        email=email,
        availability=availability,
        phone_number=phoneNumber,
        comfortable=comfortable,
        languages=languages,
        hname=matched_hawker)

    try:
        with Session(engine) as session:
            session.execute(update_stmt)
            session.execute(insert_stmt)
            session.commit()
        
        # Only send email if this is in production
        if PRODUCTION:
            send_email(email)
        
    except IntegrityError:
        return "3"

    return "0"

# if __name__ == "__main__":
#     engine = create_engine(DATABASE_URI)
#     hawker_metadata = MetaData()
#     hawkers_table = Table('hawker', hawker_metadata, autoload_with=engine)

#     search_stmt = select([column('hname')]).where(and_(hawkers_table.c.id.in_([1,2,3,4,5,6,7,8,9,10]), hawkers_table.c.assigned != 1))
#     with Session(engine) as session:
#         result = session.execute(search_stmt).first()

#         if result:
#             print(result[0])