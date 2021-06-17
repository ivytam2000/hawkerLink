import {GenericLayout} from '../Layout';
import {HawkerSearchBar} from '../../components/HawkerSearchBar';
import {SearchHawker} from '../../services/SearchHawker';
import './AssistMain.css';
import {Link} from "react-router-dom";

import arrow from './assist-icons/right-arrow.png'
import bracket from './bracket.png'

import register from './assist-icons/register.png'
import meet from './assist-icons/meet.png'
import choose from './assist-icons/choose.png'
import signup from './assist-icons/deliveroo.jpeg'
import hours from './assist-icons/claim.png'

import prep from './assist-icons/prep.png'
import help from './assist-icons/help.png'
import email from './assist-icons/email.png'
import training from './assist-icons/training.png'

import notice from './assist-icons/notice.png'
import consent from './assist-icons/consent.png'
import info from './assist-icons/info.png'
import submit from './assist-icons/submit.png'

import directory from './assist-icons/directory.png'
import allocate from './assist-icons/allocate.png'
import business from './assist-icons/business.png'

import notif from './assist-icons/notif.png'
import volunteer from './assist-icons/volunteer.png'

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

    function clickA() {
        var aBrac = document.getElementById("a-brac");
        var aCont = document.getElementById("a-cont");
        if (open == 3) {
            aCont.className = "expand";
            aBrac.className = "expand";
            open = 0;
        } else {
            aCont.className = "expanded";
            aBrac.className = "expanded";
            open = 3;
        }
    }

    window.onload = function() {
        var prepExp = document.getElementById("p-exp");
        prepExp.addEventListener("click", clickP, false);
        var helpExp = document.getElementById("h-exp");
        helpExp.addEventListener("click", clickH, false);
        var assistExp = document.getElementById("a-exp");
        assistExp.addEventListener("click", clickA, false);
    }

    return (
        <body>
        <GenericLayout id={3} />

        <div className="buffer"></div>
        <div className="about-text">
            <p>Hawkerlink is a service which links up tech-savvy volunteers 
                to hawkers who need someone to help them register with food delivery services.</p>
            <p>As a volunteer, you can help guide hawkers through the registration process of 
                food delivery services to get them back on their feet.</p>
        </div>

        <table className="icons">
        
            <tr className="main">
                <td class="icon">
                    <img src={register} alt= "Register" width="100px" height="100px"></img>
                    <Link to="/search">
                    <p><button className="step">Sign up</button></p>
                    </Link>
                </td> 

                <td class="arrow">
                <img src={arrow} alt= "Arrow" width="30px"></img>
                </td>

                <td class="icon">
                    <img src={prep} alt="Preparation" width="100px"></img>
                    <p><button className="step" id="p-exp">Prepare<br></br>&#9660;</button></p>
                </td>

                <td class="arrow">
                <img src={arrow} alt= "Arrow" width="30px"></img>
                </td>

                <td class="icon">
                    <img src={help} alt="Help" width="100px"></img>
                    <p><button className="step" id="h-exp">Help the hawker<br></br>&#9660;</button></p>
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
                    <p><button className="step-nonclick">Receive email with instructions</button></p>
                </td>

                <td class="arrow-expand">
                <img src={arrow} alt= "Arrow" width="30px"></img>
                </td>

                <td class="icon-expand">
                    <img src={training} alt="Training" height="100px"></img>
                    <p><button className="step-nonclick">Attend a short training program</button></p>
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

        <div className="about-text">
            <p>Do you know a hawker that wants to get on delivery services but simply does not know how to? 
                You can submit them to our database through "suggest a hawker".</p>
        </div>

        <table className="icons">
        
            <tr className="main">
                <td class="icon">
                    <img src={notice} alt= "Notice" width="100px" height="100px"></img>
                    <p><button className="step-nonclick">Notice a hawker who needs help</button></p>
                </td> 

                <td class="arrow">
                <img src={arrow} alt= "Arrow" width="30px"></img>
                </td>

                <td class="icon">
                    <img src={consent} alt="Consent" width="100px"></img>
                    <p><button className="step-nonclick">Ask for consent</button></p>
                </td>

                <td class="arrow">
                <img src={arrow} alt= "Arrow" width="30px"></img>
                </td>

                <td class="icon">
                    <img src={info} alt="Info" width="100px"></img>
                    <p><button className="step-nonclick">Collect information</button></p>
                </td>

                <td class="arrow">
                <img src={arrow} alt= "Arrow" width="30px"></img>
                </td>

                <td class="icon">
                    <img src={submit} alt="Submit" width="100px"></img>
                    <Link to="/suggesthawker"> 
                    <p><button className="step">Submit to our database</button></p>
                    </Link>
                </td>
            </tr>
        </table>

        <div className="about-text">
            <p>Your contributions will make a tangible difference in the lives of these hawkers, through the following process...</p>
        </div>

        <table className="icons">
        
            <tr className="main">
                <td class="icon">
                    <img src={directory} alt= "Directory" width="100px" height="100px"></img>
                    <p><button className="step-nonclick">Get listed in our directory</button></p>
                </td> 

                <td class="arrow">
                <img src={arrow} alt= "Arrow" width="30px"></img>
                </td>

                <td class="icon">
                    <img src={allocate} alt="Allocate" width="100px"></img>
                    <p><button className="step" id="a-exp">Receive a volunteer allocation<br></br>&#9660;</button></p>
                </td>

                <td class="arrow">
                <img src={arrow} alt= "Arrow" width="30px"></img>
                </td>

                <td class="icon">
                    <img src={signup} alt="Signup" width="100px"></img>
                    <p><button className="step-nonclick">Register on food delivery platform</button></p>
                </td>

                <td class="arrow">
                <img src={arrow} alt= "Arrow" width="30px"></img>
                </td>

                <td class="icon">
                    <img src={business} alt="Business" width="100px"></img>
                    <p><button className="step-nonclick">Business improves</button></p>
                </td>
            </tr>

            <tr className="expand" id="a-brac">
                <td class="icon"></td>
                <td class="pbrac" colspan="3">
                    <img src={bracket} alt="Bracket" width="360px" height="50px"></img>
                </td>
                <td class="arrow"></td>
                <td class="arrow"></td>
                <td class="icon"></td>
            </tr>

            <tr className="expand" id="a-cont">
                <td class="icon"></td>

                <td class="icon-expand">
                    <img src={notif} alt="Notif" height="100px"></img>
                    <p><button className="step-nonclick">Notified by hawkerlink</button></p>
                </td>

                <td class="arrow-expand">
                <img src={arrow} alt= "Arrow" width="30px"></img>
                </td>

                <td class="icon-expand">
                    <img src={volunteer} alt="Volunteer" height="100px"></img>
                    <p><button className="step-nonclick">Get contacted by volunteer</button></p>
                </td>

                <td class="arrow"></td>
                <td class="arrow"></td>
                <td class="icon"></td>
            </tr>
        </table>

        <div className="bot-buffer"></div>
        
        </body>
    );
}