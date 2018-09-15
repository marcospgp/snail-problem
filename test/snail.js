// Test Snail endpoint for correct results

const request = require('supertest');
const app = require('../app.js');

describe('GET /snail', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/snail')
      .expect(200, done);
  });
});

describe('POST /snail', () => {
  it('should return the correct result', (done) => {
    request(app)
      .post('/snail')
      .send({
        h: 6, u: 3, d: 1, f: 10
      })
      .expect(200, {
        status: '200 OK',
        message: 'success on day 3'
      }, done);
  });

  it('should return the correct result', (done) => {
    request(app)
      .post('/snail')
      .send({
        h: 10, u: 2, d: 1, f: 50
      })
      .expect(200, {
        status: '200 OK',
        message: 'failure on day 4'
      }, done);
  });

  it('should return the correct result', (done) => {
    request(app)
      .post('/snail')
      .send({
        h: 50, u: 5, d: 3, f: 14
      })
      .expect(200, {
        status: '200 OK',
        message: 'failure on day 7'
      }, done);
  });

  it('should return the correct result', (done) => {
    request(app)
      .post('/snail')
      .send({
        h: 50, u: 5, d: 4, f: 1
      })
      .expect(200, {
        status: '200 OK',
        message: 'failure on day 68'
      }, done);
  });

  it('should return the correct result', (done) => {
    request(app)
      .post('/snail')
      .send({
        h: 50, u: 6, d: 3, f: 1
      })
      .expect(200, {
        status: '200 OK',
        message: 'sucess on day 20'
      }, done);
  });

  it('should return the correct result', (done) => {
    request(app)
      .post('/snail')
      .send({
        h: 1, u: 1, d: 1, f: 1
      })
      .expect(200, {
        status: '200 OK',
        message: 'failure on day 2'
      }, done);
  });
});
