// const dgram = require('dgram');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "*"
  }
});

let droneState = "disconnected";


// const throttle = require('lodash/throttle');

// const PORT = 8889;
// const HOST = '192.168.10.1';
// const drone = dgram.createSocket('udp4');
// drone.bind(PORT);
//
// const droneState = dgram.createSocket('udp4');
// droneState.bind(8890);

const parseState = state => state
  .split(';')
  .map(x => x.split(':'))
  .reduce((data, [key, value]) => {
    data[key] = value;
    return data;
  }, {});


// drone.on('message', message => {
//   console.log(`🤖 : ${message}`);
//   io.sockets.emit('status', message.toString());
// });

function handleError(err) {
  if (err) {
    console.log('ERROR');
    console.log(err);
  }
}

io.on('connection', socket => {
  console.log("client connected");
  socket.on('command', command => {
    console.log('command Sent from browser');
    console.log(command);
    // drone.send(command, 0, command.length, PORT, HOST, handleError);
  });
  setTimeout(() => socket.emit('status', 'CONNECTED'), 1000);
});

// droneState.on(
//   'message',
//   throttle(state => {
//     const formattedState = parseState(state.toString());
//     io.sockets.emit('dronestate', formattedState);
//   }, 100)
// );

http.listen(8080, () => {
  console.log('Socket io server up and running');
});
