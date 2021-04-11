import io from "socket.io-client";
import { land } from "./droneControl";
import { DRONE_FLYING_STATE } from "./constants";

let socket;
let disconnecting = false;

const getSocket = () => {
  if (!socket) {
    _connect();
  }
  return socket;
};

const disconnectSocket = () => {
  disconnecting = true;
  land();
  setTimeout(() => {
    if (!socket) {
      return;
    }
    socket.disconnect();
    socket = null;
  }, 5000);
};

const droneStateListener = (setDroneState, setDroneFlyingState) => {
  socket.on("dronestate", (message) => {
    setDroneState(message);
    setDroneFlyingState((currentValue) => {
      const height = Number(message.h);
      if (height === 0 && currentValue === DRONE_FLYING_STATE.landed) {
        return currentValue;
      } else if (height > 0 && currentValue === DRONE_FLYING_STATE.flying) {
        return currentValue;
      } else if (height === 0 && currentValue === DRONE_FLYING_STATE.flying) {
        return DRONE_FLYING_STATE.landed;
      } else if (height > 0 && currentValue === DRONE_FLYING_STATE.landed) {
        return DRONE_FLYING_STATE.flying;
      }
      return currentValue;
    });
  });
};

const getSocketDisconnecting = () => disconnecting;

const _connect = () => {
  disconnecting = false;
  socket = io("http://localhost:8080");
};

export { getSocket, disconnectSocket, droneStateListener, getSocketDisconnecting };
