import {GenericLayout} from '../Sitewide/Layout';
import { makeStyles } from '@material-ui/core/styles';

import helping from './imgs/helping.png';
import delivery from './imgs/delivery.png';
import foodpanda from './imgs/foodpanda.png';
import { Cip } from '../Forms/Cip';
import faq from './imgs/FAQ.png'
import { VerificationPopUp } from '../../components/PopUp/VerficationPopUp';

const useStyles = makeStyles({

    navBar: {
        paddingTop: '6rem',
        paddingLeft: '5rem',
        listStyleType: 'none',
        width: '300px',
        position: 'fixed',
        
    },

    navText: {
        color: 'white',
        fontFamily: "Helvetica",
        textTransform: "uppercase",
        textDecoration: 'none',
        fontSize: '20px',
    },

    anchors: {
        display: 'block',
        position: 'relative',
        top: '-40px',
        visibility: 'hidden',
    },

    secTitles: {
        color: 'white',
        fontSize: '30px',
        fontFamily: "Helvetica",
        textAlign: 'center',
    },

    contentSect: {
        paddingTop: '6rem',
        paddingLeft: '30%',
        paddingRight: '30%',
    }
});


function NavigationBar() {
    const classes = useStyles();

    return (
        <nav>
            <ul className={classes.navBar}>
                <li><a href="#meetup" className={classes.navText}>Meetup Guide</a></li>
                <li><a href="#delivery" className={classes.navText}>Delivery Comparison</a></li>
                <li><a href="#signup" className={classes.navText}>Signup Help </a></li>
                <li><a href="#cip" className={classes.navText}>Claim CIP Hours</a></li>
                <li><a href="#faq" className={classes.navText}>FAQ</a></li>
            </ul>
        </nav>);

}

function MeetupSection() {
    const classes = useStyles();

    return (
        <div className={classes.contentSect}>
            <a className={classes.anchors} id='meetup'> </a>
            <h1 className={classes.secTitles}> Meetup Guide </h1>
            <img src={helping} width='100%'></img>
            <VerificationPopUp />
        </div>
    );
}

function DeliverySection() {
    const classes = useStyles();

    return (
        <div className={classes.contentSect}>
            <a className={classes.anchors} id='delivery'></a>
            <h1 className={classes.secTitles}> Delivery Comparison</h1>
            <img src={delivery} width='100%'></img>
        </div>
    );
}

function SignUpSection() {
    const classes = useStyles();

    return (
        <div className={classes.contentSect}>
            <a className={classes.anchors} id='signup'></a>
            <h1 className={classes.secTitles}> Signup Help </h1>
            <h1 className={classes.secTitles}> FoodPanda </h1>
            <img src={foodpanda} width='100%'></img>
        </div>
    );
}

function CIPSection() {
    const classes = useStyles();

    return (
        <div className={classes.contentSect}>
            <a className={classes.anchors} id='cip'></a>
            <h1 className={classes.secTitles}> Claim CIP Hours </h1>
            <Cip/>
        </div>
    );
}


function FAQSection() {
    const classes = useStyles();

    return (
        <div className={classes.contentSect}>
            <a className={classes.anchors} id='faq'></a>
            <h1 className={classes.secTitles}> Frequently Asked Questions</h1>
            <img src={faq} width='100%'></img>
        </div>
    );
}

export function ResourcesVerificationPage() {
    document.documentElement.style.scrollBehavior = "smooth";

    return (
        <body>
            <GenericLayout id={3} />
            <NavigationBar />
            <MeetupSection />
            <DeliverySection />
            <SignUpSection/>
            <CIPSection />
            <FAQSection />
        </body>
    );
}