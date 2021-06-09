import {GenericLayout} from '../Layout';
import HawkerSearchBar from '../../components/HawkerSearchBar';
import {SearchHawker} from '../../services/AssistHawker';
import {HawkerSearchResults} from '../../components/HawkerSearchResults';
import './AssistMain.css';
import {Link} from "react-router-dom";

export function AssistMainPage() {
    return (
        <body>
        <GenericLayout />
        <div className="title">
            <p>Here's how you can get involved ♥</p>
        </div>

        <table className="icons">
            <tr>
                <td class="icon">
                    <img src="./assist-icons/register.png" width="100px"></img>
                    <p className="caption">1. Find hawkers suitable for you and sign up to help them</p>
                </td>
                <td class="icon">
                    <img src="./assist-icons/meet.png" width="100px"></img>
                    <p className="caption">2. Arrange a meeting with your allocated hawker</p>
                </td>
                <td class="icon">
                    <img src="./assist-icons/choose.png" width="100px"></img>
                    <p className="caption">3. Help them to choose a food delivery service</p>
                </td>
                <td class="icon">
                    <img src="./assist-icons/signup.png" width="100px"></img>
                    <p className="caption">4. Register their business with the chosen food delivery service</p>
                </td>
                <td class="icon">
                    <img src="./assist-icons/hours.png" width="100px"></img>
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