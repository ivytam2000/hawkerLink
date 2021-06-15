import {GenericLayout} from '../Layout';
import {HawkerSearchBar} from '../../components/HawkerSearchBar';
import {SearchHawker} from '../../services/SearchHawker';
import './AssistMain.css';
import {Link} from "react-router-dom";
import register from './assist-icons/register.png'
import meet from './assist-icons/meet.png'
import choose from './assist-icons/choose.png'
import signup from './assist-icons/deliveroo.jpeg'
import hours from './assist-icons/claim.png'
import arrow from './assist-icons/right-arrow.png'
import prep from './assist-icons/prep.png'
import help from './assist-icons/help.png'
import email from './assist-icons/email.png'
import training from './assist-icons/training.png'
import bracket from './bracket.png'

export function AssistMainPage() {

    var open = 0;

    function clickP() {
        var pCont = document.getElementById("p-cont");
        var pBrac = document.getElementById("p-brac");
        if (open == 1) {
            pCont.className = "expand";
            pBrac.className = "expand";
            open = 0;
        } else {
            pCont.className = "expanded";
            pBrac.className = "expanded";
            open = 1;
        }
        document.getElementById("h-cont").className = "expand";
        document.getElementById("h-brac").className = "expand";
    }

    function clickH() {
        document.getElementById("p-cont").className = "expand";
        document.getElementById("p-brac").className = "expand";
        var hBrac = document.getElementById("h-brac");
        var hCont = document.getElementById("h-cont");
        if (open == 2) {
            hCont.className = "expand";
            hBrac.className = "expand";
            open = 0;
        } else {
            hCont.className = "expanded";
            hBrac.className = "expanded";
            open = 2;
        }
    }

    window.addEventListener("load", function(){
        var prepExp = document.getElementById("p-exp");
        prepExp.addEventListener("click", clickP, false);
        var helpExp = document.getElementById("h-exp");
        helpExp.addEventListener("click", clickH, false);
    });

    return (
        <body>
        <GenericLayout id={3} />

        <table className="icons">
        
            <tr className="main">
                <td class="icon">
                    <img src={register} alt= "Register" width="100px" height="100px"></img>
                    <Link to="/page2">
                    <p><button className="step">Sign up</button></p>
                    </Link>
                </td> 

                <td class="arrow">
                <img src={arrow} alt= "Arrow" width="30px"></img>
                </td>

                <td class="icon">
                    <img src={prep} alt="Preparation" width="100px"></img>
                    <p><button className="step" id="p-exp">Prepare</button></p>
                </td>

                <td class="arrow">
                <img src={arrow} alt= "Arrow" width="30px"></img>
                </td>

                <td class="icon">
                    <img src={help} alt="Help" width="100px"></img>
                    <p><button className="step" id="h-exp">Help the hawker</button></p>
                </td>

                <td class="arrow">
                <img src={arrow} alt= "Arrow" width="30px"></img>
                </td>

                <td class="icon">
                    <img src={hours} alt="Hours" width="100px"></img>
                    <Link to="/resources#cip"> 
                    <p><button className="step">Claim CIP hours</button></p>
                    </Link>
                </td>
            </tr>

            <tr className="expand" id="p-brac">
                <td class="icon"></td>
                <td class="pbrac" colspan="3">
                    <img src={bracket} alt="Bracket" width="360px" height="50px"></img>
                </td>
                <td class="arrow"></td>
                <td class="arrow"></td>
                <td class="icon"></td>
            </tr>

            <tr className="expand" id="p-cont">
                <td class="icon"></td>

                <td class="icon-expand">
                    <img src={email} alt="Email" height="100px"></img>
                    <p><button className="step">Receive email with instructions</button></p>
                </td>

                <td class="arrow-expand">
                <img src={arrow} alt= "Arrow" width="30px"></img>
                </td>

                <td class="icon-expand">
                    <img src={training} alt="Training" height="100px"></img>
                    <p><button className="step">Attend a short training program</button></p>
                </td>

                <td class="arrow"></td>
                <td class="arrow"></td>
                <td class="icon"></td>
            </tr>

            <tr className="expand" id="h-brac">
                <td class="icon"></td>
                <td class="arrow"></td>
                <td class="pbrac" colspan="5">
                    <img src={bracket} alt="Bracket" width="660px" height="50px"></img>
                </td>
            </tr>

            <tr className="expand" id="h-cont">
                <td class="icon"></td>
                <td class="arrow"></td>

                <td class="icon-expand">
                    <img src={meet} alt="Meet" height="100px"></img>
                    <Link to="/resources#meetup"> 
                    <p><button className="step">Meet up</button></p>
                    </Link>
                </td>

                <td class="arrow-expand">
                <img src={arrow} alt= "Arrow" width="30px"></img>
                </td>

                <td class="icon-expand">
                    <img src={choose} alt="Choose" height="100px"></img>
                    <Link to="/resources#delivery"> 
                    <p><button className="step">Help them choose a service</button></p>
                    </Link>
                </td>

                <td class="arrow-expand">
                <img src={arrow} alt= "Arrow" width="30px"></img>
                </td>

                <td class="icon-expand">
                    <img src={signup} alt="Signup" height="100px"></img>
                    <Link to="/resources#signup"> 
                    <p><button className="step">Register with the service</button></p>
                    </Link>
                </td>
            </tr>
        </table>

        {/* <div className="exp">
            <Link to="/findhawker">
            <button className="start-button">Start by finding a hawker</button> 
            </Link>
        </div> */}

        <section className="content">
            <div class = "text-alt-l">
                <HawkerSearchBar searchHawker={SearchHawker}/>
            </div>
        </section>
        
        </body>
    );
}