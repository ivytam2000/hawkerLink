import {GenericLayout} from '../Layout';
import './Form.css';
import {Link } from "react-router-dom";
import React, { useState } from "react";
import { Multiselect } from "multiselect-react-dropdown";

export function SignUpPage(props) {

    const defaultIdField = props.location.id + ' (' + props.location.storeName + ')';
    console.log(defaultIdField);

    const data = 
    [{Time: '9am-12pm (Mon)', Day: 'Monday'},
      {Time: '12pm-3pm (Mon)', Day: 'Monday'},
      {Time: '3pm-6pm (Mon)', Day: 'Monday'},

      {Time: '9am-12pm (Tues)', Day: 'Tuesday'},
      {Time: '12pm-3pm (Tues)', Day: 'Tuesday'},
      {Time: '3pm-6pm (Tues)', Day: 'Tuesday'},

      {Time: '9am-12pm (Wed)', Day: 'Wednesday'},
      {Time: '12pm-3pm (Wed)', Day: 'Wednesday'},
      {Time: '3pm-6pm (Wed)', Day: 'Wednesday'},

      {Time: '9am-12pm (Thurs)', Day: 'Thursday'},
      {Time: '12pm-3pm (Thurs)', Day: 'Thursday'},
      {Time: '3pm-6pm (Thurs)', Day: 'Thursday'},

      {Time: '9am-12pm (Fri)', Day: 'Friday'},
      {Time: '12pm-3pm (Fri)', Day: 'Friday'},
      {Time: '3pm-6pm (Fri)', Day: 'Friday'},

      {Time: '9am-12pm (Sat)', Day: 'Saturday'},
      {Time: '12pm-3pm Sat)', Day: 'Saturday'},
      {Time: '3pm-6pm (Sat)', Day: 'Saturday'},

      {Time: '9am-12pm (Sun)', Day: 'Sunday'},
      {Time: '12pm-3pm (Sun)', Day: 'Sunday'},
      {Time: '3pm-6pm (Sun)', Day: 'Sunday'},
    ]

    const [timeOptions] = useState(data);

    return (
        <body>
        <GenericLayout id={2}/>

        <section className="signup-info"> 
        <div className="info-content">
          <p className="info-header">SIGN UP TO HELP</p>
          <p className="info-text">If you are …</p>
          <ul className="info-point">
          <li>Confident that you can follow the steps required to help a hawker register with a food delivery service</li>
          <li>Comfortable with volunteering to help a hawker with this for about 3 hours, according to the level of help specified on their profiles</li>
          </ul>
          <p className="info-text">You’re a great fit! Please sign up on the right.</p>
        </div>
        </section>

        <section className="form-content"> 
            <form action="/action_page.php">
            <p><span class="label" for="ID">ID(s) of hawkers you're interested in helping</span>
            <input type="form-text" id="ID" name="ID" defaultValue={defaultIdField}></input></p>
            <span class="label" for="name">Name</span>
            <input type="form-text" id="name" name="name"></input>
            <p><span class="label" for="contact">Contact number</span>
            <input type="form-text" id="contact" name="contact"></input></p>
            <p><span class="label" for="availability">Your availability</span>
            <div className="availability">
            <Multiselect
             options={timeOptions}
             groupBy="Day"
             displayValue="Time"
             showCheckbox={true}
             placeholder="Select your availability"
             closeOnSelect= {false}
            />
            </div>
            </p>
            <p><span class="label" for="language">What languages, including dialects, can you speak?</span>
            <input type="form-text" id="language" name="language" placeholder="e.g. English, Mandarin, Hokkien" defaultValue={props.location.userLanguages}></input></p>
            <p><span class="label" for="other">Are you comfortable with us asking you to help another hawker, if the hawkers you chose are unavailable?</span></p>
            <div>
            <div className="yn-radio">
           <input type="radio" value="Yes" name="help"/> Yes 
            </div>
            <div className="yn-radio">
            <input type="radio" value="No" name="help"/> No
            </div>
            </div>
            <input type="submit" value="Submit"></input>
            </form> 
            <div>
          <Link to="/"><button>
              Back to Search
            </button>  </Link>
  </div>
        </section>

        </body>
    );
}