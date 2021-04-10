import React from "react";
import Title from "./Title";
import {Box, LinearProgress, Typography} from "@material-ui/core";

export default function Status({handPoseModelStatus, droneState, droneFlyingState}) {
  return (
    <React.Fragment>
      <Title>Status</Title>
      <p>Handpose Model: {handPoseModelStatus}</p>
      <p>Battery</p>
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" value={Number(droneState.bat)}/>
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">{`${Math.round(
            Number(droneState.bat)
          )}%`}</Typography>
        </Box>
      </Box>
      <p>Height: {droneState.h}</p>
      <p>Flying State: {droneFlyingState}</p>
    </React.Fragment>
  );
}
