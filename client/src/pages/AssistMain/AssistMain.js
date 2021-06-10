import {GenericLayout} from '../Layout';
import HawkerSearchBar from '../../components/HawkerSearchBar';
import {SearchHawker} from '../../services/AssistHawker';
import {HawkerSearchResults} from '../../components/HawkerSearchResults';
import './AssistMain.css';
import {Link} from "react-router-dom";
import register from './assist-icons/register.png'
import meet from './assist-icons/meet.png'
import choose from './assist-icons/choose.png'
import signup from './assist-icons/deliveroo.jpeg'
import hours from './assist-icons/claim.png'
import arrow from './assist-icons/right-arrow.png'
import maingraphic from './hawker.png'

export function AssistMainPage() {
    return (
        <body>
        <GenericLayout id={3} />
        {/* <div className="title">
            <p>There are many invisible hawkers in Singapore who are unable to get on food delivery sites and have seen their business plummet. We 
                here at HawkerLink hope to connect young volunteers with these hawkers to help guide them through the signup process. 
            </p>
        </div> */}
        <section className="graphic">
            <div className="graphic-text">
                <p className="graphic-text"><b>hawkerlink</b> connects volunteers with elderly hawkers to help them register with food delivery platforms.</p>
            </div>
        </section>


        <div className="title">
            <p>How to get involved:</p>
        </div>

        <table className="icons">
            <tr>
                <td class="icon">
                    <img src={register} alt= "Register" width="100px" height="100px"></img>
                    <Link to="/findhawker">
                    <p><button className="step">Sign up</button></p>
                    </Link>
                </td> 

                <td class="arrow">
                <img src={arrow} alt= "Arrow" width="30px"></img>
                </td>

                <td class="icon">
                    <img src={meet} alt="Meet" width="100px"></img>
                    <p><button className="step">Meet up</button></p>
                </td>

                <td class="arrow">
                <img src={arrow} alt= "Arrow" width="30px"></img>
                </td>

                <td class="icon">
                    <img src={choose} alt="Choose" width="100px"></img>
                    <p><button className="step">Help them choose a service</button></p>
                </td>

                <td class="arrow">
                <img src={arrow} alt= "Arrow" width="30px"></img>
                </td>

                <td class="icon">
                    <img src={signup} alt="Signup" width="100px"></img>
                    <p><button className="step">Register with the service</button></p>
                </td>

                <td class="arrow">
                <img src={arrow} alt= "Arrow" width="30px"></img>
                </td>

                <td class="icon">
                    <img src={hours} alt="Hours" width="100px"></img>
                    <p><button className="step">Claim CIP hours</button></p>
                </td>
            </tr>
        </table>

        <div className="exp">
            <Link to="/findhawker">
            <button className="start-button">Start by finding a hawker</button> 
            </Link>
        </div>
        
        </body>
    );
}