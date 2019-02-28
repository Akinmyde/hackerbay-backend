/* eslint-env mocha */

import 'babel-polyfill';
import request from 'supertest';
import expect from 'expect';
import app from '../app';

request.agent(app.listen());

describe('App test', () => {
  it('should return status code 404', (done) => {
    request(app)
      .get('/api/v1/rubbish')
      .expect((res) => {
        expect(res.body).toEqual({ status: 404, error: 'Sorry, the page you tried cannot be found' });
      })
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
  it('should return status code 404', (done) => {
    request(app)
      .post('/api/v1/unknown')
      .expect((res) => {
        expect(res.body).toEqual({ status: 404, error: 'Sorry, the page you tried cannot be found' });
      })
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});
