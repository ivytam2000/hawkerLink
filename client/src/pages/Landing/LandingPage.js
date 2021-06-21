import {GenericLayout} from '../Sitewide/Layout';
import './LandingPage.css';

export function LandingPage() {
    return (
        <body>
        <GenericLayout />
        <div className="graphic">
            <div className="graphic-wrapper">
            <div className="graphic-text">
                <b>hawkerlink</b><br></br>
                a non-profit that connects volunteers with elderly hawkers to help them register with food delivery platforms.
            </div>
            </div>
        </div>
        </body>
    );
}