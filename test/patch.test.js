/* eslint-env mocha */

import 'babel-polyfill';
import request from 'supertest';
import expect from 'expect';
import app from '../app';
import baseUrl from './app.test';

const user = {
  username: 'testmaster1',
  password: 'testmaster1',
};

let superUserToken;
request.agent(app.listen());

describe('Patch test /PATCH', () => {
  it('Should create a and generate a token', async () => {
    try {
      const res = await request(app)
        .post(`${baseUrl}/auth/signup`)
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
  it('Should return status code 400 if Patch request is null', (done) => {
    request(app)
      .post(`${baseUrl}/patch`)
      .send({
        patchObject: [{ op: 'replace', path: '/baz', value: 'boo' }],
        token: superUserToken,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .expect((res) => {
        expect(res.body).toEqual({ status: 400, message: ['PatchRequest is required and must be an object'] });
      })
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
  it('Should return status code 400 if Patch request is empty', (done) => {
    request(app)
      .post(`${baseUrl}/patch`)
      .send({
        patchRequest: {},
        patchObject: [{ op: 'replace', path: '/baz', value: 'boo' }],
        token: superUserToken,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .expect((res) => {
        expect(res.body).toEqual({ status: 400, message: ['PatchRequest is required and must be an object'] });
      })
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
  it('Should return status code 400 if Patch request is not an object', (done) => {
    request(app)
      .post(`${baseUrl}/patch`)
      .send({
        patchRequest: 'bjkdf',
        patchObject: [{ op: 'replace', path: '/baz', value: 'boo' }],
        token: superUserToken,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .expect((res) => {
        expect(res.body).toEqual({ status: 400, message: ['PatchRequest is required and must be an object'] });
      })
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
  it('Should return status code 400 if Patch object is null', (done) => {
    request(app)
      .post(`${baseUrl}/patch`)
      .send({
        patchRequest: { baz: 'qux', foo: 'bar' },
        token: superUserToken,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .expect((res) => {
        expect(res.body).toEqual({ status: 400, message: ['PatchObject is required and must be an array'] });
      })
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
  it('Should return status code 400 if Patch request is empty', (done) => {
    request(app)
      .post(`${baseUrl}/patch`)
      .send({
        patchRequest: { baz: 'qux', foo: 'bar' },
        patchObject: [],
        token: superUserToken,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .expect((res) => {
        expect(res.body).toEqual({ status: 400, message: ['PatchObject is required and must be an array'] });
      })
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
  it('Should return status code 400 if Patch request is not an object', (done) => {
    request(app)
      .post(`${baseUrl}/patch`)
      .send({
        patchRequest: { baz: 'qux', foo: 'bar' },
        patchObject: { op: 'replace', path: '/baz', value: 'boo' },
        token: superUserToken,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .expect((res) => {
        expect(res.body).toEqual({ status: 400, message: ['PatchObject is required and must be an array'] });
      })
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
  it('Should return status code 200', async () => {
    try {
      const res = await request(app)
        .post(`${baseUrl}/patch`)
        .send({
          patchRequest: { baz: 'qux', foo: 'bar' },
          patchObject: [{ op: 'replace', path: '/baz', value: 'boo' }],
          token: superUserToken,
        })
        .expect(200);
      const { status, message, data } = res.body;
      expect(status).toEqual(200);
      expect(message).toEqual('Success');
      expect(data).toEqual(data);
    } catch (error) {
      throw new Error(error);
    }
  });
});
