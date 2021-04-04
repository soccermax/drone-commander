import React from 'react';
import Link from '@material-ui/core/Link';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

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


export default function Status({handPoseModelStatus}) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Status</Title>
      <Typography component="p" variant="h6">
        Handpose Model: {handPoseModelStatus}
      </Typography>
      <div className={classes.depositContext}>

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
