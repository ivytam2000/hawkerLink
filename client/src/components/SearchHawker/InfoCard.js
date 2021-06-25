import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    borderStyle: 'solid',
    borderColor: 'white',
    borderWidth: 5,
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

export function InfoCard(props) {
  const classes = useStyles();

  // Add default image if none is found (for all non-default hawkers for now)
  let imageId = props.id;
  if (imageId >= 13) {
    const even = imageId % 2;
    imageId = 13 + even;
  }

  const imageLink = "hawker_cards/" + imageId + ".jpg";

  var selected = false;

  function infoToSubmit() {
    var cardSelected = document.getElementById(props.id);
    console.log(cardSelected.style.borderColor);
    if (!selected) {
      props.infoFromCard(props.id, props.storeName);
      cardSelected.style.borderColor = '#C5343B';
      selected = true;
    } else {
      props.removeInfo(props.id);
      cardSelected.style.borderColor = 'white';
      selected = false;
    }
  }

  return (
    <Card onClick={infoToSubmit} className={classes.root} id={props.id}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={imageLink}
          title={props.storeName}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" align='center'>
            {props.storeName}
          </Typography>
          <Typography align="center">
            {props.location}
          </Typography>
          <Typography align="center">
            {props.languages}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
