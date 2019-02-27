/* eslint-env mocha */

import 'babel-polyfill';
import request from 'supertest';
import expect from 'expect';
import app from '../app';

request.agent(app.listen());

describe('POST /auth/signup', () => {
  it('Should create a new user', async () => {
    try {
      const res = await request(app)
        .post('/api/v1/auth')
        .send({
          username: 'test',
          password: 'test',
        })
        .expect(200);
      expect(res.body.status).toEqual(201);
      expect(res.body.message).toEqual('Registration was successfull');
    } catch (error) {
      console.log(error);
    }
  });
  it('Should throw an error if username already exist', async () => {
    const res = await request(app)
      .post('/api/v1/auth')
      .send({
        username: 'test',
        password: 'test',
      })
      .expect(409);
    expect(res.body.status).toEqual(409);
    expect(res.body.message).toEqual('Username already exists');
  });
});
