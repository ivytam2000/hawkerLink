import {GenericLayout} from '../Layout';
import './Form.css';
import {Link } from "react-router-dom";
import { Multiselect } from "multiselect-react-dropdown";
import React, { useState } from "react";

export function SuggestionPage() {
  const data = [
    { Language: "English", id: 1 },
    { Language: "Mandarin", id: 2 },
    { Language: "Hokkien", id: 3 },
    { Language: "Teochew", id: 4 },
    { Language: "Malay", id: 5 },
    { Language: "Tamil", id: 6 },
  ]

  const reasonData = [
    { Reason: "IT-illiterate"},
    { Reason: "Lack of proficieny in English/Chinese to sign-up"},
    { Reason: "Other"}
  ]

  const [options] = useState(data);

    return (
        <body>
        <GenericLayout id={1}/>

        <section className="suggestion-info"> 
        <div className="info-content">
          <p className="info-header">SUGGEST A HAWKER</p>
          <p className="info-text">Do you know a hawker who is…</p>
          <ul className="info-point">
          <li>Confident that you can follow the steps required to help a hawker register with a food delivery service</li>
          <li>Comfortable with volunteering to help a hawker with this for about 3 hours, according to the level of help specified on their profiles</li>
          </ul>
          <p className="info-text">Or simply needs help registering on food delivery platforms such as foodpanda or grabfood?</p>
          <p className="info-text">Hawkerlink provides a network of tech-savvy
          volunteers to help these “invisible” hawkers get 
          back on their feet by teaching them how to register
          themselves on food delivery platforms and utilise their services. </p>
          <p className="info-header">BEFORE SUGGESTING A HAWKER, HAVE YOU...</p>
          <ul className="info-point">
          <li>Had a conversation with the hawker telling them that you want to suggest them to us?</li>
          <li>Checked that they want to get on food delivery platforms, but need help with the process?</li>
          </ul>
        </div>
        </section>

        <section className="form-content"> 
            <form action="/action_page.php">
            <span class="label" for="stall">Name of hawker stall</span>
            <input type="form-text" id="stall" name="stall"></input>

            <p><span class="label" for="centre">Name of hawker centre</span>
            <input type="form-text" id="centre" name="centre"></input></p>

            <p><span class="label" for="address">Address</span>
            <input type="form-text" id="address" name="address"></input></p>

            <p><span class="label" for="name">Hawker's name</span>
            <input type="form-text" id="name" name="name"></input></p>
            
            <p><span class="label" for="number">Hawker's phone number</span>
            <input type="form-text" id="number" name="number"></input></p>
            
            <p><span class="label" for="help">Could you explain why this hawker would require our help?</span></p>

            <div className="reason-radio">
            <input type="radio" value="Yes" name="help"/> IT-illiterate
            </div>
            <div className="reason-radio">
            <input type="radio" value="No" name="help"/> Lack of proficieny in English/Chinese to sign-up
            </div>
            <div className="reason-radio">
            <input type="radio" value="Yes" name="help"/> Other
            </div>

            <p><span class="label" for="help">If Other, please specify: </span> 

            <input type="form-text" id="help" name="help"></input></p>
            
            <p><span class="label" for="languages">What language(s),including dialects, can this Hawker speak?</span>
            <Multiselect
             options={options}
             displayValue="Language"
             showCheckbox={true}
             placeholder="Language(s)"
             closeOnSelect= {false}
            />
            </p>

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