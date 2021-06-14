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

export function InfoCard(props) {
  const classes = useStyles();

  const imageLink = "hawker_cards/" + props.id + ".jpg";

  return (
    <Link style={{ textDecoration: 'none' }} to={{pathname:"/page2", id: props.id, storeName: props.storeName, userLanguages:props.userLanguages, selectedLanguages:props.selectedLanguages}}>
    <Card className={classes.root}>
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
   </Link>
  );
}
