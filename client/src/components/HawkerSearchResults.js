import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { InfoCard } from './InfoCard';
import {Link} from 'react-router-dom';

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
  but: {
    position: 'fixed',
    right: 70,
    bottom: 50,
  },
  submit: {
    backgroundColor: '#C5343B',
    color: 'white',
    textDecoration: 'bold',
    padding: '20px 30px',
    margin: '8px 0',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  buffer: {
    marginBottom: 200,
  }
}));

/* Each card should contain image, store name, location, languages */

export function HawkerSearchResults(props) {
  const classes = useStyles();

  const data = props.data;

  var ids = [];
  var storeNames = [];

  function infoToCard(info) {
    return <Grid item xs={4}> <InfoCard 
      id={info.id}
      storeName={info.storeName}
      location={info.location}
      languages={info.language}
      userLanguages={props.userLanguages}
      selectedLanguages={props.selectedLanguages}
      resultsData={props.data} 
      infoFromCard={infoFromCard} 
      removeInfo={removeInfo}/> </Grid>;
  }

  function cardRowToGridRow(cardRow) {
    return <Grid container item xs={12} spacing={3}>
      <React.Fragment>
        {cardRow}
      </React.Fragment>
    </Grid>;
  }

  function infoFromCard(id, storeName) {
    ids.push(id);
    storeNames.push(storeName);
  }

  function removeInfo(id) {
    const index = ids.indexOf(id);
    if (index > -1) {
      ids.splice(index, 1);
      storeNames.splice(index, 1);
    }
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
      <div className={classes.but}>
        <Link style={{ textDecoration: 'none' }} to={{pathname:"/signup", ids: ids, storeNames: storeNames, userLanguages:props.userLanguages, selectedLanguages:props.selectedLanguages, resultsData:props.resultsData}}>
          <button className={classes.submit}>
              Submit
          </button>
        </Link>
      </div>
      <div className={classes.buffer}></div>
    </div>
    
  );
}
