import time
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