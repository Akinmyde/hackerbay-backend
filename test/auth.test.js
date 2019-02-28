/* eslint-env mocha */

import 'babel-polyfill';
import request from 'supertest';
import expect from 'expect';
import app from '../app';

request.agent(app.listen());

const user = {
  username: 'test',
  password: 'test',
};

describe('POST /auth/signup', () => {
  it('Should create a new user', async () => {
    try {
      const res = await request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .expect(200);
      expect(res.body.status).toEqual(201);
      expect(res.body.message).toEqual('Registration was successfull');
    } catch (error) {
      throw new Error(error);
    }
  });
  it('Should throw an error if username already exist', async () => {
    try {
      const res = await request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .expect(409);
      expect(res.body.status).toEqual(409);
      expect(res.body.message).toEqual('Username already exists');
    } catch (error) {
      throw new Error(error);
    }
  });
});
describe('POST auth/login', () => {
  it('sholud throw an error', async () => {
    try {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ username: 'test', password: 'unknown' })
        .expect(401);
      expect(res.body.status).toEqual(401);
      expect(res.body.message).toEqual('Invalid username or password');
    } catch (error) {
      throw new Error(error);
    }
  });
  it('sholud login a user', async () => {
    try {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send(user)
        .expect(200);
      expect(res.body.status).toEqual(200);
      expect(res.body.message).toEqual('Login was successful');
    } catch (error) {
      throw new Error(error);
    }
  });
});
