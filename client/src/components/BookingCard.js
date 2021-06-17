import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Link, useParams} from 'react-router-dom';
import { sendBookedSession } from '../services/Booking';
import "./PopUp.css";
import "./BookingCard.css";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 200,
    borderStyle: 'solid',
    borderColor: 'white',
    borderWidth: 5,
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1
  },
});

/* Should contain image, store name, location, languages */

export function BookingCard(props) {

    const classes = useStyles();

    console.log(props.isoStartTime);
    console.log(props.availability);

    var time = new Date(props.isoStartTime);
    const day = time.getDay();
    const month = time.getMonth();
    const year = time.getFullYear().toString();
    const dayInNumber = time.getDate();
    const startHour = time.getHours();
    const startMinute = time.getMinutes();
    const avail = props.availability;
    const isoStartTime = props.isoStartTime;


    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";


    var months = new Array(12);
    months[0] = "January";
    months[1] = "February";
    months[2] = "March";
    months[3] = "April";
    months[4] = "May";
    months[5] = "June";
    months[6] = "July";
    months[7] = "August";
    months[8] = "September";
    months[9] = "October";
    months[10] = "November";
    months[11] = "December";


    function displayDate(){  
        return dayInNumber + ' ' + months[month] + ' ' + year ;
    }

    function displayDayWithDate(){
        return weekday[day] + ' ' + '(' + displayDate() + ')';
    }


    function ampmTime(hours, minutes){
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        return hours + ':' + minutes + ' ' + ampm;
    }

    function timeSlot(){
        var startTime = ampmTime(startHour, startMinute);
        var endTime = ampmTime(startHour+3, startMinute);

        return startTime + ' - ' + endTime;
    }

    function availability(){
        return avail + ' SLOTS AVAILABLE'
    }

    const {id}= useParams();
    console.log({id}.id);

    const [modal, setModal] = useState(false);

    const toggleModal = (e) => {
        e.preventDefault();
        setModal(!modal);
    };

  const toggleModalAndSubmit = (e) => {
    e.preventDefault();
    setModal(!modal);
    console.log({id}.id);
    sendBookedSession({id}.id, isoStartTime);
  }
 

  return (
    <>

    {modal && (
        <div className="modal">
          <div className="overlay"></div>
          <div className="booking-content">
            <p className='popup-content'> Please confirm that you are signing up for the training session on <br/> {displayDayWithDate()}  </p>
            <button className="btn-cancel" onClick={toggleModal}>
              CANCEL
                </button>
            <button className="btn-confirm" onClick={toggleModalAndSubmit}>
              CONFIRM
            </button>
          </div>
        </div>
      )}

    <Card className={classes.root}>
      <CardActionArea onClick={toggleModal}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" align='center'className='card-content'>
            {weekday[day]}
          </Typography>
          <Typography align="center">
            {displayDate()}
          </Typography>
          <Typography align="center">
            {timeSlot()}
          </Typography>
          <Typography align="center">
            {availability()}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
</>
);
}
