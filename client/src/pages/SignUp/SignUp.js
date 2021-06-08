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
          <p className = "info-header">SIGN UP TO HELP</p>
          <p className = "info-text">If you are …</p>
          <li className = "info-point">Confident that you can follow the steps (above) required to help a hawker register with a food delivery service</li>
            Comfortable with volunteering to help a hawker with this for about 3 hours , according to the level of help specified on their profiles
          <p className = "info-text">You’re a great fit! Please sign up on the right.</p>
        </section>

        <section className="form"> 
          
        </section>

        </body>
    );
}