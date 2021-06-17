import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { BookingCard } from './BookingCard';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: 'relative',
    top:150,
    left:120,
  },
}));

/* Each card should contain image, store name, location, languages */

export function BookingSessions(props) {
  const classes = useStyles();
// COMMENTED OUT FOR DEBUGGING
  const[data,setData] = useState([]);

  //const data = props.data;


   props.data.then((result) => {
    if (Array.isArray(result) && result.length) {
        setData(result)
        console.log(data);
      }
    });

  function infoToBookingCard(info) {
    return <Grid item xs={4} 
    justify="space-between" > <BookingCard
      isoStartTime={info.startTime}
      availability={info.availability} /> </Grid>;
  }

  function cardRowToGridRow(cardRow) {
    return ( <Grid container item xs={12} spacing={5} 
    justify="space-between"   >
        {cardRow}
    </Grid>

    );
  }

  /* Dynamically generate rows with up to 3 cards each. */
  var allrows = []
  var chunk = 3
  var i, j, row = 0;
  for (i = 0, j = data.length; i < j; i += chunk) {
    row = data.slice(i, i + chunk).map(infoToBookingCard);
    allrows.push(cardRowToGridRow(row));
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={10} alignItems="center"
    justify= "space-between"  >
        {allrows}
      </Grid>
    </div>
  );
}
