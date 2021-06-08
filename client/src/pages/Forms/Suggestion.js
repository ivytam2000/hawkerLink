import {GenericLayout} from '../Layout';
import './Form.css';
import {Link } from "react-router-dom";

export function SuggestionPage() {
    return (
        <body>
        <GenericLayout />

        <section className="info"> 
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
            <input type="text" id="stall" name="stall"></input>

            <p><span class="label" for="centre">Name of hawker centre</span>
            <input type="text" id="centre" name="centre"></input></p>

            <p><span class="label" for="address">Address</span>
            <input type="text" id="address" name="address"></input></p>

            <p><span class="label" for="name">Hawker's name</span>
            <input type="text" id="name" name="name"></input></p>
            
            <p><span class="label" for="number">Hawker's phone number</span>
            <input type="text" id="number" name="number"></input></p>
            
            <p><span class="label" for="help">Could you explain why this hawker would require our help?</span>
            <input type="text" id="help" name="help" value="e.g. IT-illiterate, lacks proficiency in English to sign-up, can’t read Chinese…"></input></p>
            
            <p><span class="label" for="languages">What languages(including dialects) can this Hawker speak?</span>
            <input type="text" id="languages" name="languages" value="e.g. English, Hokkien, Mandarin"></input></p>

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