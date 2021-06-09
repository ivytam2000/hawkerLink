import {GenericLayout} from '../Layout';
import HawkerSearchBar from '../../components/HawkerSearchBar';
import {SearchHawker} from '../../services/AssistHawker';
import {HawkerSearchResults} from '../../components/HawkerSearchResults';
import './AssistMain.css';
import {Link} from "react-router-dom";
import register from './assist-icons/register.png'
import meet from './assist-icons/meet.png'
import choose from './assist-icons/choose.png'
import signup from './assist-icons/signup.png'
import hours from './assist-icons/hours.png'

export function AssistMainPage() {
    return (
        <body>
        <GenericLayout />
        <div className="title">
            <p>There are many invisible hawkers in Singapore who are unable to get on food delivery sites and have seen their business plummet. We 
                here at HawkerLink hope to connect young volunteers with these hawkers to help guide them through the signup process. 
            </p>
        </div>
        <div className="title">
            <p>Here's how you can get involved ♥</p>
        </div>

        <table className="icons">
            <tr>
                <td class="icon">
                    <img src={register} alt= "Register"width="100px"></img>
                    <p className="caption">1. Find hawkers suitable for you and sign up to help them</p>
                </td> 
                <td class="icon">
                    <img src={meet} alt="Meet" width="100px"></img>
                    <p className="caption">2. Arrange a meeting with your allocated hawker</p>
                </td>
                <td class="icon">
                    <img src={choose} alt="Choose" width="100px"></img>
                    <p className="caption">3. Help them to choose a food delivery service</p>
                </td>
                <td class="icon">
                    <img src={signup} alt="Signup" width="100px"></img>
                    <p className="caption">4. Register their business with the chosen food delivery service</p>
                </td>
                <td class="icon">
                    <img src={hours} alt="Hours" width="100px"></img>
                    <p className="caption">5. Claim your CIP hours (if applicable)</p>
                </td>
            </tr>
        </table>

        <div className="exp">
            <p>Click on the steps above to skip to it!</p>
            <p>Alternatively,</p>
            <Link to="/findhawker">
            <button>Start by finding a hawker</button> 
            </Link>
        </div>
        
        </body>
    );
}