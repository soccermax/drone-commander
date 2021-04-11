import { getSocket } from "./socket";
import { GESTURE, DRONE_FLYING_STATE, DRONE_COMMANDS } from "./constants";

const _sendCommand = (command) => {
  console.log("drone control: %s", command);
  const socket = getSocket();
  socket.emit("command", command);
};

const controlDroneBasedOnGesture = (gesture, droneState) => {
  switch (gesture) {
    case GESTURE.thumbsUp:
      if (droneState === DRONE_FLYING_STATE.landed) {
        return takeOff();
      }
      break;
    case GESTURE.thumbsDown:
      if (droneState === DRONE_FLYING_STATE.flying) {
        return land();
      }
      break;
    default:
      break;
  }
};

const takeOff = () => {
  _sendCommand(DRONE_COMMANDS.takeOff);
};

const land = () => {
  _sendCommand(DRONE_COMMANDS.land);
};

const emergency = () => {
  _sendCommand(DRONE_COMMANDS.emergency);
};

const backFlip = () => {
  _sendCommand(DRONE_COMMANDS.backFlip);
};

const frontFlip = () => {
  _sendCommand(DRONE_COMMANDS.frontFlip);
};

export { controlDroneBasedOnGesture, land, takeOff, backFlip, frontFlip, emergency };
