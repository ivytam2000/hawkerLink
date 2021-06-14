import {GenericLayout} from '../Layout';
import './Form.css';
import {Link } from "react-router-dom";
import React, { useState } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import { AssistHawker}  from '../../services/AssistHawker.js';
import { AssistPopUp } from '../../components/AssistPopUp';

export function SignUpPage(props) {

    const defaultIdField = props.location.id + ' (' + props.location.storeName + ')';
    console.log(props.location.userLanguages);
    console.log(props.location.selectedLanguages);
   
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

    const languageChoices = [
      { Language: "English", id: 1 },
      { Language: "Mandarin", id: 2 },
      { Language: "Hokkien", id: 3 },
      { Language: "Teochew", id: 4 },
      { Language: "Malay", id: 5 },
      { Language: "Tamil", id: 6 },
    ]

    const [languagesOptions] = useState(languageChoices);

    const [timeOptions] = useState(data);

    const userLanguages = props.location.userLanguages;

    /* Fields Required for Assist-Hawker Post Request */

    const [name, setName] = useState(0);
    const [email, setEmail] = useState(0);
    const [number, setNumber] = useState(0);
    const [hawkerIds, setHawkerIds] = useState(0);
    const [languages, setLanguages] = useState(userLanguages);
    const [availability, setAvailability] = useState([]);

    function onSelectLanguages(selectedList, selectedItem) {
      setLanguages(selectedList.map((lang) => lang.Language));
    }

    function onSelectAvailability(selectedList, selectedItem) {
      setAvailability(selectedList.map((avail)=> avail.Time));
    }

    const handleSubmit = (e) => {
      e.preventDefault(); // prevents browser refresh
      AssistHawker(
        name,
        email,
        hawkerIds,
        number,
        availability,
        languages
      );
    }

    return (
        <body>
        <GenericLayout id={2}/>

        <section className="signup-info"> 
        <div className="info-content">
          <p className="info-header">SIGN UP TO HELP</p>
          <p className="signup-text">If you can …</p>
          <ul className="signup-text">
          <li>Help a hawker register on food delivery services (resources are provided)</li>
          <li>Spend at least 3 hours to help them </li>
          </ul>
          <p className="signup-text">Then, please sign up!</p>
        </div>
        </section>

        <section className="form-content"> 
            <form action="/action_page.php">
            <p><span class="label" for="ID">ID(s) of hawkers you're interested in helping (separated by commas if multiple)</span>
            <input type="form-text" pattern="^[1-9]?[0-9](,[1-9]?[0-9])*$"id="ID" name="ID" defaultValue={defaultIdField} onChange={(e) => setHawkerIds(e.target.value)}></input></p>
            <span class="label" for="name">Name</span>
            <input type="form-text" id="name" name="name" onChange={(e) => setName(e.target.value)}></input>
            <p><span class="label" for="contact">Contact number</span>
            <input type="form-text" id="contact" name="contact" onChange={(e) => setNumber(e.target.value)}></input></p>
            <p><span class="label" for="contact">Email Address</span>
            <input type="form-text" id="email" name="email" onChange={(e) => setEmail(e.target.value)}></input></p>
            <p><span class="label" for="availability">Your availability</span>
            <div className="availability">
            <Multiselect
             options={timeOptions}
             groupBy="Day"
             displayValue="Time"
             showCheckbox={true}
             placeholder="Select your availability"
             closeOnSelect= {false}
             onSelect={onSelectAvailability}
             onRemove={onSelectAvailability}
            />
            </div>
            </p>
            <p><span class="label" for="language">What languages, including dialects, can you speak?</span>
            <Multiselect
             options={languagesOptions}
             displayValue="Language"
             showCheckbox={true}
             placeholder="Language(s)"
             closeOnSelect={false}
             onSelect={onSelectLanguages}
             onRemove={onSelectLanguages}
             selectedValues={props.location.selectedLanguages}
             /> </p>
            <p><span class="label" for="other">Are you comfortable with us asking you to help another hawker, if the hawkers you chose are unavailable?</span></p>
            <div>
            <div className="yn-radio">
           <input type="radio" value="Yes" name="help"/> Yes 
            </div>
            <div className="yn-radio">
            <input type="radio" value="No" name="help"/> No
            </div>
            </div>
            <AssistPopUp />
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