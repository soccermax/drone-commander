import React from "react";
import Title from "./Title";

export default function Status({ handPoseModelStatus, droneState, droneFlyingState }) {
  return (
    <React.Fragment>
      <Title>Status</Title>
      <p>Handpose Model: {handPoseModelStatus}</p>
      <p>Battery: {droneState.bat}</p>
      <p>Height: {droneState.h}</p>
      <p>Flying State: {droneFlyingState}</p>
    </React.Fragment>
  );
}
