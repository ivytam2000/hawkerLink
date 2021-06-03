import time
import os
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

# Environment variables
POSTGRES_DB = os.environ.get('POSTGRES_DB')
POSTGRES_USER = os.environ.get('POSTGRES_USER')
POSTGRES_PASSWORD = os.environ.get('POSTGRES_PASSWORD')
DATABASE_ADDRESS = os.environ.get('DATABASE_ADDRESS') # Defined by network in docker-compose

# Use postgresql if in production
if not POSTGRES_DB or not POSTGRES_USER or not POSTGRES_PASSWORD or not DATABASE_ADDRESS:    
    DATABASE_URI = 'sqlite:///local.db'
else:
    DATABASE_URI = 'postgresql://{}:{}@{}/{}'.format(POSTGRES_USER, POSTGRES_PASSWORD, DATABASE_ADDRESS, POSTGRES_DB)

# Set up database
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI
db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = 'accounts'
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), unique=True)
    email = db.Column(db.String(120), unique=True)

    def __init__(self, username, email) -> None:
        self.username = username
        self.email = email

    def __repr__(self) -> str:
        return '<User %r' % self.username

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/accounts')
def get_accounts():
    all_accounts = User.query.all()

    accounts = []
    for acc in all_accounts:
        accounts.append({'id': acc.user_id,
                         'username': acc.username,
                         'email': acc.email})

    return jsonify(accounts)

@app.route('/create')
def create():
    db.create_all()
    return "success"