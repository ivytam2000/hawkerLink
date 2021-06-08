import time
import os
from flask import Flask, jsonify, request, abort
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import *
from sqlalchemy.sql.expression import union_all
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

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/hawkers', methods=['POST'])
def get_accounts():
    if not request.json:
        abort(400)
    language_query = request.json['languages']
    region_query = request.json['region']

    engine = create_engine(DATABASE_URI)
    metadata = MetaData()
    hawkers = Table('hawker_directory', metadata, autoload_with=engine)

    # Create multiple queries to match on the cross product of languages and regions
    all_queries = []
    for language in language_query:
        for region in region_query:
            all_queries.append(select(['*']).where(and_(hawkers.c.region == region, hawkers.c.languages.contains(language))))

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

@app.route('/create')
def create():
    db.create_all() 
    return "success"



# languages = ['English', 'Chinese']
# regions = ['West', 'East']

# matches = [(English, East), (English, West)]

# query1 = Hawkers.filter()