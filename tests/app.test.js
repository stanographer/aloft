process.env.NODE_ENV = 'test';

const request = require('supertest');

describe('Loading Express', () => {
  let app;

  beforeEach(() => {
    app = require('../app');
  });

  it('responds to /', function testSlash(done) {
    request(app)
      .get('/')
      .expect(200, done);
  });
  it('404s everything else', function testPath(done) {
    request(app)
      .get('/foo/baz/bar')
      .expect(404, done);
  });
});