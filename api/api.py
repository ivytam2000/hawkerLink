import time
import os
from flask import Flask, jsonify, request, abort
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import and_

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
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI
app.config['APPLICATION_ROOT'] = '/api'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Hawkers(db.Model):
    __tablename__ = 'hawker_directory'
    id = db.Column(db.Integer, primary_key=True)
    store_name = db.Column(db.String(100), unique=True)
    region = db.Column(db.String(100))
    languages = db.Column(db.String(200), unique=True) # CSV of languages

    def __init__(self, username, email) -> None:
        self.username = username
        self.email = email

    def __repr__(self) -> str:
        return '<User %r' % self.username

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/hawkers', methods=['POST'])
def get_accounts():
    if not request.json:
        abort(400)
    language_query = request.json['languages']
    location_query = request.json['location']
    all_accounts = Hawkers.query.filter(and_(Hawkers.languages == language_query, 
                                             Hawkers.region == location_query))

    accounts = []
    for acc in all_accounts:
        accounts.append({'id': acc.id,
                         'store_name': acc.store_name,
                         'location': acc.region,
                         'languages': acc.languages})

    return jsonify(accounts)

@app.route('/create')
def create():
    db.create_all()
    return "success"