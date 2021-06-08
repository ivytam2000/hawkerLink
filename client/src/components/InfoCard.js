// import React from "react";

// export default function InfoText(props) {
//   return (<p> The store name is {props.storeName}.
//     The location is {props.location}.
//     The language spoken is {props.language}. </p>
//   );
// }

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

/* Should contain image, store name, location, languages */

export function InfoCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title={props.storeName}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.storeName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.card}>
        <Button size="small" color="primary">
          Help this Hawker
        </Button>
      </CardActions>
    </Card>
  );
}
