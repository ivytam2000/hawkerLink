import {GenericLayout} from '../Sitewide/Layout';
import { Link, useHistory } from "react-router-dom";
import './Form.css';
import React from "react";
import { CipPopUp } from '../../components/PopUp/CIPPopUp';

export function Cip(props) {

  

    return (
        <body>
        <GenericLayout id={3}/>

    

        <section className="cip-form-content"> 
            <form action="/action_page.php">
            <span class="label" for="name">Name</span>
            <input type="form-text" id="name" name="name"></input>
            <p><span class="label" for="contact">School</span>
            <input type="form-text" id="contact" name="contact"></input></p>
            <p><span class="label" for="availability">I.C Number</span>
            <input type="form-text" id="contact" name="contact"></input></p>
            <p><span class="label" for="language">Hours Spent Helping Them</span>
            <input type="form-text" id="language" name="language"></input></p>

            <p><span class="label" for="other">Email Address</span>
            <input type="form-text" id="language" name="language"></input></p>
            <button className="submit-form">
                Submit
            </button>

            </form> 
            <div>
  </div>
        </section>

        </body>
    );
}
