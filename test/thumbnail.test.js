/* eslint-env mocha */

import 'babel-polyfill';
import request from 'supertest';
import expect from 'expect';
import app from '../app';

request.agent(app.listen());

const user = {
  username: 'testmaster',
  password: 'testmaster',
};

let superUserToken;

const imageUrl = 'https://cdn.pixabay.com/photo/2016/06/18/17/42/image-1465348_960_720.jpg';

describe('POST /thumbnail', () => {
  it('Should create a and generate a token', async () => {
    try {
      const res = await request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .expect(200);
      const { status, message, token } = res.body;
      expect(status).toEqual(201);
      expect(message).toEqual('Registration was successfull');
      superUserToken = token;
    } catch (error) {
      throw new Error(error);
    }
  });
  it('Should generate a image thumbnail', async () => {
    try {
      const res = await request(app)
        .post('/api/v1/thumbnail')
        .send({ imageUrl, token: superUserToken })
        .expect(200);
      const { data, status, message } = res.body;
      const { height, width } = data;
      expect(status).toEqual(200);
      expect(message).toEqual('Success');
      expect(height).toEqual(50);
      expect(width).toEqual(50);
    } catch (error) {
      throw new Error(error);
    }
  });
  it('Should throw an error while uploading an image', async () => {
    try {
      const res = await request(app)
        .post('/api/v1/thumbnail')
        .send({ imageUrl: 'fhjfh', token: superUserToken })
        .expect(500);
      const { status, message } = res.body;
      expect(status).toEqual(500);
      expect(message).toEqual('Error encounter while processing your request');
    } catch (error) {
      throw new Error(error);
    }
  });
  it('should return status code 400 if imageUrl not provided', (done) => {
    request(app)
      .post('/api/v1/thumbnail')
      .send({ imageUrl: 1, token: superUserToken })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .expect((res) => {
        expect(res.body).toEqual({ status: 400, message: 'Image url is required and must be a string' });
      })
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
  it('should return status code 400 if imageUrl not provided', (done) => {
    request(app)
      .post('/api/v1/thumbnail')
      .send({ imageUrl: ['dsfgdg'], token: superUserToken })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .expect((res) => {
        expect(res.body).toEqual({ status: 400, message: 'Image url is required and must be a string' });
      })
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});
