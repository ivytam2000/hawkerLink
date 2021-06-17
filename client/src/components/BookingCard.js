import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';

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
  },
});

/* Should contain image, store name, location, languages */

export function BookingCard(props) {

    const classes = useStyles();

    var time = new Date("2021-06-17T13:30:00");
    const day = time.getDay();
    const month = time.getMonth();
    const year = time.getFullYear().toString();
    const dayInNumber = time.getDate();
    const startHour = time.getHours();
    const startMinute = time.getMinutes();


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


    function displayDate(date){  
        return dayInNumber + ' ' + months[month] + ' ' + year ;
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

  
//     function nextweek(){
//       var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7);
//       return nextweek;
//   }
  
  /*const imageLink = "hawker_cards/" + props.id + ".jpg"; */

  return (
    // <Link style={{ textDecoration: 'none' }} to={{pathname:"/signup", id: props.id, storeName: props.storeName, userLanguages:props.userLanguages, selectedLanguages:props.selectedLanguages, resultsData:props.resultsData}}>
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" align='center'>
            {weekday[day]}
          </Typography>
          <Typography align="center">
            {displayDate(time)}
          </Typography>
          <Typography align="center">
            {timeSlot()}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
//    </Link>
  );
}
