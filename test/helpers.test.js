/* eslint-env mocha */

import expect from 'expect';
import {
  generateHash,
  verifyHash,
  encode,
  decode,
} from '../helpers';

let hash;
let encodedToken;
describe('Password hash test', () => {
  it('Should return a hashed password', () => {
    hash = generateHash('testpassword');
    expect(hash).toContain('sha1$');
    expect(hash.length).toBeGreaterThan(20);
  });
  it('Should return a hashed password', () => {
    const hash1 = generateHash('testpassword');
    expect(hash1).toContain('sha1$');
    expect(hash.length).toBeGreaterThan(20);
  });
  it('Should verify a hashedpassword and return true', () => {
    const isVerified = verifyHash('testpassword', hash);
    expect(isVerified).toBeTruthy();
  });
  it('Should verify a hashedpassword and return false', () => {
    const isVerified = verifyHash('password', hash);
    expect(isVerified).toBeFalsy();
  });
});

describe('Authenticate token test', () => {
  it('should return a token', () => {
    encodedToken = encode(1, 'test');
    expect(encodedToken).toContain('.');
    expect(encodedToken.length).toBeGreaterThan(30);
  });
  it('should return a decodedToken that contains information', () => {
    const decodedToken = decode(encodedToken);
    const {
      exp, iat, userId, userName,
    } = decodedToken;
    expect(decodedToken).toEqual({
      exp, iat, userId, userName,
    });
  });
});
