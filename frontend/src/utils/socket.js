import io from 'socket.io-client';

let socket;

export const getSocket = () => {
  if (!socket) {
    _connect();
  }
  return socket;
}

const _connect = () => {
  socket = io('http://localhost:8080');
}
