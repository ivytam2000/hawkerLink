import time
import os
from flask import Flask, jsonify, request, abort
from sqlalchemy import *
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

# Environment variables
POSTGRES_DB = os.environ.get('POSTGRES_DB')
POSTGRES_USER = os.environ.get('POSTGRES_USER')
POSTGRES_PASSWORD = os.environ.get('POSTGRES_PASSWORD')
DATABASE_ADDRESS = os.environ.get('DATABASE_ADDRESS') # Defined by network in docker-compose
DATABASE_URI = ''

# Use postgresql if in production
if not POSTGRES_DB or not POSTGRES_USER or not POSTGRES_PASSWORD or not DATABASE_ADDRESS:    
    DATABASE_URI = 'sqlite:///local.db'
else:
    DATABASE_URI = 'postgresql://{}:{}@{}/{}'.format(POSTGRES_USER, POSTGRES_PASSWORD, DATABASE_ADDRESS, POSTGRES_DB)

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
        print(e)
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

# @app.route('/assist-hawker', methods=['POST'])
# def suggest_hawker():
#     """
#     Receives POST requests in the following format:
#         {
#             'name': string,
#             'email': string,
#             'availability': [string],
#             'phoneNumber': string,
#             'comfortable': string, 
#             'languages': [string],
#             'hawkerIds'
#         }

#     Returns "0" on success, "1" if input json is malformed,
#     "2" if an existing entry already exists in the database.
#     TODO: change to http error codes
#     """

#     if not request.json:
#         abort(400)

#     try:
#         store_name = request.json['storeName']
#         hawker_centre = request.json['hawkerCentre']
#         address = request.json['address']
#         hawker_name = request.json['hawkerName']
#         hawker_phone_number = request.json['hawkerPhoneNumber']
#         region = request.json['region']
#         reason_for_help = request.json['reasonForHelp']
#         languages = ", ".join(request.json['languages']) # Concat into a single string
#     except KeyError as e:
#         print(e)
#         return "1"

#     metadata = MetaData()
#     hawkers_table = Table('hawker', metadata, autoload_with=engine)

#     stmt = insert(hawkers_table).values(
#         hname=hawker_name,
#         sname=store_name, 
#         phone_number=hawker_phone_number,
#         reason_for_help=reason_for_help,
#         languages=languages, 
#         hawker_centre=hawker_centre,
#         address=address,
#         region=region,
#         assigned=0)

#     try:
#         with Session(engine) as session:
#             session.execute(stmt)
#             session.commit()
#     except IntegrityError:
#         return "2"

#     return "0"