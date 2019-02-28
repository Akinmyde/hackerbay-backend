/* eslint-env mocha */

import 'babel-polyfill';
import request from 'supertest';
import expect from 'expect';
import app from '../app';

request.agent(app.listen());

describe('Validate User Input', () => {
  it('should return status code 400 if username not provided', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({ password: 'testingv6t7' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .expect((res) => {
        expect(res.body).toEqual({ status: 400, message: ['username is required and must be a string'] });
      })
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
  it('should return status code 400 if username not provided', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: '',
        password: 'testingv6t7',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .expect((res) => {
        expect(res.body).toEqual({ status: 400, message: ['username is required and must be a string'] });
      })
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });

  it('should return status code 400 if password not provided', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'testing',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .expect((res) => {
        expect(res.body).toEqual({ status: 400, message: ['password is required and must be a string'] });
      })
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
  it('should return status code 400 if username not provided', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'testing',
        password: '',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .expect((res) => {
        expect(res.body).toEqual({ status: 400, message: ['password is required and must be a string'] });
      })
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});

describe('Test for Islogin', () => {
  it('should throw an error is user is not logged in', (done) => {
    request(app)
      .post('/api/v1/thumbnail')
      .send({ imageUrl: ['dsfgdg'] })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({ status: 401, message: 'Unauthorized' });
      })
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
  it('should throw an error is user is not logged in', (done) => {
    request(app)
      .post('/api/v1/thumbnail')
      .send({ imageUrl: [], token: 'nulltoken' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({ status: 401, message: 'Unauthorized' });
      })
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});
