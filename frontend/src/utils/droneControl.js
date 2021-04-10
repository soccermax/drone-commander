import { getSocket } from "./socket";
import { GESTURE, DRONE_FLYING_STATE } from "./constants";

const COMMANDS = {
  takeOff: "takeoff",
  land: "land",
  emergency: "emergency",
  backFlip: "flip b",
  frontFlip: "flip f",
  hovering: "command",
};

const _sendCommand = (command) => {
  console.log("drone control: %s", command);
  const socket = getSocket();
  socket.emit("command", command);
};

const controlDroneBasedOnGesture = (gesture, droneState) => {
  switch (gesture) {
    case GESTURE.thumbsUp:
      if (droneState === DRONE_FLYING_STATE.landed) {
        console.log("drone take off");
        return takeOff();
      } else {
        return console.log("Drone already took off");
      }
    case GESTURE.thumbsDown:
      if (droneState === DRONE_FLYING_STATE.flying) {
        return land();
      } else {
        return console.log("Drone already landed");
      }
    default:
      break;
  }
};

const takeOff = () => {
  _sendCommand(COMMANDS.takeOff);
};

const land = () => {
  _sendCommand(COMMANDS.land);
};

const emergency = () => {
  _sendCommand(COMMANDS.emergency);
};

const backFlip = () => {
  _sendCommand(COMMANDS.backFlip);
};

const frontFlip = () => {
  _sendCommand(COMMANDS.frontFlip);
};

export { controlDroneBasedOnGesture, land, takeOff, backFlip, frontFlip, emergency };
