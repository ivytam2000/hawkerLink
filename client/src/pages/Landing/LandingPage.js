import {GenericLayout} from '../Layout';
import {HawkerSearchBar} from '../../components/HawkerSearchBar';
import {SearchHawker} from '../../services/SearchHawker';
import {HawkerSearchResults} from '../../components/HawkerSearchResults';
import './LandingPage.css';
import {Link} from "react-router-dom";

export function LandingPage() {
    return (
        <body>
        <GenericLayout />
        <div className="graphic">
            <div className="graphic-wrapper">
            <div className="graphic-text">
                <b>hawkerlink</b><br></br>
                connects volunteers with elderly hawkers to help them register with food delivery platforms.
            </div>
            </div>
        </div>
        </body>
    );
}