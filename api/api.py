from flask import Flask, jsonify, request, abort

from main import main_setup, search_hawker, search_booking, submit_new_hawker, volunteer_signup, book_training

####################################
#  Set up database and flask app   #
####################################

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

@app.before_first_request
def setup():
    main_setup()

####################################
#  Retrieval functions             #
####################################

@app.route('/search-hawker', methods=['POST'])
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

    hawkers_fetched = search_hawker(language_query, region_query)

    return jsonify(hawkers_fetched)

@app.route('/search-booking', methods=['GET'])
def search_training():
    """
    GET requests will return the following:
        [
            {
                'startTime': datetime string,
                'availability': int
            }
        ]
            
    Returns list of available slots for the next n weeks.
    """

    weeks_in_advance = 3
    max_number_per_booking = 5
    booking_counts = search_booking(weeks_in_advance, max_number_per_booking)

    return jsonify(booking_counts)

####################################
#  Submission functions            #
####################################

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

    return submit_new_hawker(hawker_name=hawker_name,
        store_name=store_name, 
        hawker_phone_number=hawker_phone_number,
        reason_for_help=reason_for_help,
        languages=languages, 
        hawker_centre=hawker_centre,
        address=address,
        region=region)

@app.route('/volunteer-signup', methods=['POST'])
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
            'hawkerIds': [string]
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
        phone_number = request.json['number']
        availability = ", ".join(request.json['availability'])
        comfortable = request.json['comfortable']
        languages = ", ".join(request.json['languages']) # Concat into a single string
        hawker_ids = request.json['hawkerIds']
    except KeyError:
        return "1"

    volunteer_signup(name=name,
    email=email,
    phone_number=phone_number,
    availability=availability,
    comfortable=comfortable,
    languages=languages,
    hawker_ids=hawker_ids)

    return jsonify(success=True)

@app.route('/book-training', methods=['POST'])
def book():
    """
    Receives POST requests in the following format:
        {
            'id': int,
            'startTime': datetime string
        }

    Datetime string formatted as YYYY-MM-DDThh:mm:ssZ

    ---

    GET requests will return the following:
        [
            {
                'startTime': datetime string,
                'availability': int
            }
        ]
            
    Returns list of available slots for the next two weeks.
    
    """

    if not request.json:
        abort(400)

    try:
        id = request.json['id']
        start_time = request.json['startTime']
    except KeyError:
        return "1"

    book_training(id, start_time)

    return jsonify(success=True)