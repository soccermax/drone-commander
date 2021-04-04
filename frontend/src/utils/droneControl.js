import {getSocket} from './socket';

const COMMANDS = {
  takeOff: "takeoff",
  land: "land",
  emergency: "emergency",
  backFlip: "flip b",
  frontFlip: "flip f"
}

let droneState = "landed";

const _sendCommand = (command) => {
  console.log("drone control: %s", command);
  const socket = getSocket();
  socket.emit("command", command);
}

export const controlDroneBasedOnGesture = (gesture) => {
  switch (gesture) {
    case "thumbs_up":
      if (droneState === "landed") {
        droneState = "tookOff";
        return takeOff();
      } else {
        return console.log("Drone already took off")
      }
    case "thumbs_down":
      if (droneState === "tookOff") {
        droneState = "landed";
        return land();
      } else {
        return console.log("Drone already landed")
      }
  }
}

const takeOff = () => {
  _sendCommand(COMMANDS.takeOff)
};

const land = () => {
  _sendCommand(COMMANDS.land)
};

const emergency = () => {
  _sendCommand(COMMANDS.emergency)
};

const backFlip = () => {
  _sendCommand(COMMANDS.backFlip)
};

const frontFlip = () => {
  _sendCommand(COMMANDS.frontFlip)
};

