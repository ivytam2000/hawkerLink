import {GenericLayout} from '../Layout';
import HawkerSearchBar from '../../components/HawkerSearchBar';
import LanguageSearchBar from '../../components/LanguageSearchBar';
import {SearchHawker} from '../../services/AssistHawker';
import './Form.css';

export function SignUpPage() {
    return (
        <body>
        <GenericLayout />

        <section className="info"> 
        <div className="info-content">
          <p className = "info-header">SIGN UP TO HELP</p>
          <p className = "info-text">If you are …</p>
          <li className = "info-point">Confident that you can follow the steps (above) required to help a hawker register with a food delivery service</li>
          <li className = "info-point">Comfortable with volunteering to help a hawker with this for about 3 hours , according to the level of help specified on their profiles</li>
          <p className = "info-text">You’re a great fit! Please sign up on the right.</p>
        </div>
        </section>

        <section className="form-content"> 
            <form action="/action_page.php">
            <label for="name">Name</label>
            <p><input type="text" id="name" name="name"></input></p>
            <label for="contact">Contact Number</label>
            <p><input type="text" id="contact" name="contact"></input></p>
            <label for="ID">ID(s) of hawkers you're interested in helping</label>
            <p><input type="text" id="ID" name="ID"></input></p>
            <label for="availability">Your availability</label>
            <p><input type="text" id="availability" name="availability" value="e.g. 4-7 p.m. on Mondays and Tuesdays"></input></p>
            <label for="language">What languages, including dialects, can you speak?</label>
            <p><input type="text" id="language" name="language" value="e.g. English, Mandarin, Hokkien"></input></p>
            <label for="other">Are you comfortable with us asking you to help another hawker, if the hawkers you chose are unavailable?</label>
            <p><input type="text" id="other" name="other" value="Y/N"></input></p>
            <input type="submit" value="Submit"></input>
            </form> 
        </section>

        </body>
    );
}