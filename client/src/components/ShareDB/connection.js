import ShareDB from '@teamwork/sharedb/lib/client';
import ReconnectingWebSocket from 'reconnecting-websocket';
import otText from 'ot-text';

// const port = window.location.host.split(':')[1];
const host = window.location.hostname;
const port = 9090;

const socket = new ReconnectingWebSocket('ws://' + host + ':' + port, null, {
  automaticOpen: true,
  reconnectInterval: 2000,
  maxReconnectInterval: 3000,
  timeoutInterval: 2000,
  maxReconnectAttempts: null
});

const connection = new ShareDB.Connection(socket);
console.log(connection);
ShareDB.types.register(otText.type);

export default connection;
