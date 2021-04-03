import React from 'react';
import Link from '@material-ui/core/Link';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import {Button} from "@material-ui/core";

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
  buttonCenter: {
    marginRight: "auto",
    marginLeft: "auto",
    display: "block",
    marginTop: "10px"
  }
});

export default function DroneControlButtons({detectedGesture}) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Control Panel</Title>
      <Typography component="p" variant="h4">
        Detected gesture:
      </Typography>
      <div className={classes.depositContext}>
        <Typography color="textSecondary">
          {detectedGesture}
        </Typography>
        <Button className={classes.buttonCenter} variant="contained" color="primary">Connect to drone</Button>
      </div>
      <div>
        <Link color="primary" href="#" onClick={() => {
        }}>
          Maybe we need a link
        </Link>
      </div>
    </React.Fragment>
  );
}
