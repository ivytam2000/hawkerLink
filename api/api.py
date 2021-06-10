import time
import os
from flask import Flask, jsonify, request, abort
from sqlalchemy import *
from sqlalchemy.orm import Session

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
def get_accounts():
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
    hawkers_table = Table('hawker_directory', metadata, autoload_with=engine)

    # Create multiple queries to match on the cross product of languages and regions
    all_queries = []
    for language in language_query:
        for region in region_query:
            print(language, region)
            all_queries.append(select(['*']).where(and_(hawkers_table.c.region == region, hawkers_table.c.languages.contains(language))))

    unionized = union(*all_queries)

    result = []
    hawkers = []

    with Session(engine) as session:
        result = session.execute(unionized)
        
        for acc in result:
            hawkers.append({'id': acc.id,
                            'storeName': acc.store_name,
                            'location': acc.location,
                            'language': acc.languages})

    return jsonify(hawkers)