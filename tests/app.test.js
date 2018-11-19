process.env.NODE_ENV = 'test';

const request = require('supertest');
const WebSocket = require('ws');

describe('Basic Express/backend Functionality Tests', () => {
  let app;

  beforeEach(() => {
    app = require('../app');
  });

  it('Responds to /.', done => {
    request(app)
      .get('/')
      .expect(200, done);
  });

  it('404s everything else.', done => {
    request(app)
      .get('/foo/baz/bar')
      .expect(404, done);
  });

  it('WebSocket responds to a \'ping\' with a \'pong.\'', done => {
    const socket = new WebSocket('http://localhost:5000', '', '');

    socket.on('connected', () => console.log('Websocket connected.'));
    socket.emit('ping', ' ');
    socket.on('pong', data => {
      console.log(`Data received from Websocket: ${data}.`);
    });

    done();

  });
});