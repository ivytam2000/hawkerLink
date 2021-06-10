import { GenericLayout } from '../Layout';
import { makeStyles } from '@material-ui/core/styles';

import helping from './helping.png';
import delivery from './delivery.png';

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
        fontFamily: "montserrat-bold",
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
        fontSize: '40px',
    },

    contentSect: {
        paddingTop: '6rem',
        paddingLeft: '25%',
        paddingRight: '23%',
    }
});


function NavigationBar() {
    const classes = useStyles();

    return (
        <nav>
            <ul className={classes.navBar}>
                <li><a href="#meetup" className={classes.navText}>Meet ups</a></li>
                <li><a href="#delivery" className={classes.navText}>Food Delivery</a></li>
                <li><a href="#cip" className={classes.navText}>CIP hours</a></li>
            </ul>
        </nav>);

}

function MeetupSection() {
    const classes = useStyles();

    return (
        <div className={classes.contentSect}>
            <a className={classes.anchors} id='meetup'> </a>
            <h1 className={classes.secTitles}> Meetups </h1>
            <img src={helping} width='100%'></img>
        </div>
    );
}

function DeliverySection() {
    const classes = useStyles();

    return (
        <div className={classes.contentSect}>
            <a className={classes.anchors} id='delivery'></a>
            <h1 className={classes.secTitles}> Delivery </h1>
            <img src={delivery} width='100%'></img>
        </div>
    );
}

function CIPSection() {
    const classes = useStyles();

    return (
        <div className={classes.contentSect}>
            <a className={classes.anchors} id='cip'></a>
            <h1 className={classes.secTitles}> CIP Hours </h1>
            <img src={helping} width='100%'></img>
        </div>
    );
}

export function ResourcesPage() {

    const classes = useStyles();

    return (
        <body>
            <GenericLayout />
            <NavigationBar />
            <MeetupSection />
            <DeliverySection />
            <CIPSection />
        </body>
    );
}