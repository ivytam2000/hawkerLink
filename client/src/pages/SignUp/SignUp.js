import {GenericLayout} from '../Layout';
import './Form.css';
import {Link } from "react-router-dom";

export function SignUpPage() {
    return (
        <body>
        <GenericLayout />

        <section className="info"> 
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
            <span class="label" for="name">Name</span>
            <input type="text" id="name" name="name"></input>
            <p><span class="label" for="contact">Contact Number</span>
            <input type="text" id="contact" name="contact"></input></p>
            <p><span class="label" for="ID">ID(s) of hawkers you're interested in helping</span>
            <input type="text" id="ID" name="ID"></input></p>
            <p><span class="label" for="availability">Your availability</span>
            <input type="text" id="availability" name="availability" value="e.g. 4-7 p.m. on Mondays and Tuesdays"></input></p>
            <p><span class="label" for="language">What languages, including dialects, can you speak?</span>
            <input type="text" id="language" name="language" value="e.g. English, Mandarin, Hokkien"></input></p>
            <p><span class="label" for="other">Are you comfortable with us asking you to help another hawker, if the hawkers you chose are unavailable?</span>
            <input type="text" id="other" name="other" value="Y/N"></input></p>
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