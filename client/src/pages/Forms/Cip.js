import {GenericLayout} from '../Layout';
import './Form.css';
import React from "react";

export function Cip(props) {

  

    return (
        <body>
        <GenericLayout id={2}/>

    

        <section className="cip-form-content"> 
            <form action="/action_page.php">
            <p><span class="label" for="ID">ID(s) of hawkers you have helped</span>
            <input type="form-text" id="ID" name="ID" ></input></p>
            <span class="label" for="name">Name</span>
            <input type="form-text" id="name" name="name"></input>
            <p><span class="label" for="contact">School</span>
            <input type="form-text" id="contact" name="contact"></input></p>
            <p><span class="label" for="availability">I.C Number</span>
            <input type="form-text" id="contact" name="contact"></input></p>
            <p><span class="label" for="language">Hours Spent Helping Them</span>
            <input type="form-text" id="language" name="language"></input></p>

            <p><span class="label" for="other">
            Simply submit the required information with a photo containing the number of hours you have spent and a signature by the hawker. We will then contact your schools directly to help you credit the hours. An email will be sent to you to inform you when the verification is complete.
            </span></p>
            <p><span class="label" for="other">Screenshot of hours and hawker endorsement</span></p>
            <input type="upload" value="Upload"></input>
            <p><span class="label" for="other">Email Address</span></p>
            <p><input type="form-text" id="language" name="language"></input></p>
         
            <input type="submit" value="Submit"></input>
            </form> 
            <div>
  </div>
        </section>

        </body>
    );
}
