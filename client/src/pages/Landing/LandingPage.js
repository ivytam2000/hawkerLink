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
                a non-profit that connects volunteers with 'invisible' hawkers to help them register on food delivery platforms.
            </div>
            </div>
        </div>
        </body>
    );
}