import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function DroneControlButtons() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Maybe put the buttons here</Title>
      <Typography component="p" variant="h4">
        Header
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        normal Text
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={() => {}}>
          Maybe we need a link
        </Link>
      </div>
    </React.Fragment>
  );
}
