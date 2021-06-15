import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { InfoCard } from './InfoCard';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: 'relative',
    top:250,
  },
  paper: {
    bottom:20,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

/* Each card should contain image, store name, location, languages */

export function HawkerSearchResults(props) {
  const classes = useStyles();

  const data = props.data;

  function infoToCard(info) {
    return <Grid item xs={4}> <InfoCard 
      id={info.id}
      storeName={info.storeName}
      location={info.location}
      languages={info.language}
      userLanguages={props.userLanguages}
      selectedLanguages={props.selectedLanguages} /> </Grid>;
  }

  function cardRowToGridRow(cardRow) {
    return <Grid container item xs={12} spacing={3}>
      <React.Fragment>
        {cardRow}
      </React.Fragment>
    </Grid>;
  }

  /* Dynamically generate rows with up to 3 cards each. */
  var allrows = []
  var chunk = 3
  var i, j, row = 0;
  for (i = 0, j = data.length; i < j; i += chunk) {
    row = data.slice(i, i + chunk).map(infoToCard);
    allrows.push(cardRowToGridRow(row));
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {allrows}
      </Grid>
    </div>
  );
}