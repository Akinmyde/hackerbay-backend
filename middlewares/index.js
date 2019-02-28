import validate from 'validate.js';
import isEmpty from 'lodash.isempty';
import { decode } from '../helpers';

class Middleware {
  /**
   * @description - this method check for a token
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   * @memberof Middleware
   */
  static isLogin(req, res, next) {
    const token = req.body.token || req.headers.token;
    try {
      if (validate.isEmpty(token)) {
        return res.status(401).send({
          status: 401,
          message: 'Unauthorized',
        });
      }
      const decodedToken = decode(token);
      if (decodedToken.id) {
        return next();
      }
    } catch (err) {
      return res.status(401).send({
        status: 401,
        message: 'Unauthorized',
      });
    }
    return next();
  }

  /**
   * @description - this method validate user input
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   * @memberof Middleware
   */
  static validatePatchInput(req, res, next) {
    const { patchRequest, patchObject } = req.body;
    const message = [];
    if (!validate.isObject(patchRequest) || validate.isEmpty(patchRequest)) {
      message.push('PatchRequest is required and must be an object');
    }
    if (!validate.isArray(patchObject) || validate.isEmpty(patchObject)) {
      message.push('PatchObject is required and must be an array');
    }
    if (isEmpty(message)) {
      return next();
    }
    return res.status(400).send({
      status: 400,
      message,
    });
  }

  /**
   * @description - this method validate user input for image upload
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   * @memberof Middleware
   */
  static validateImageUrl(req, res, next) {
    const { imageUrl } = req.body;
    if (!validate.isString(imageUrl) || validate.isEmpty(imageUrl)) {
      return res.status(400).send({
        status: 400,
        message: 'Image url is required and must be a string',
      });
    }
    return next();
  }

  /**
   * @description - this method validate user input
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   * @memberof Middleware
   */
  static validateUserInput(req, res, next) {
    const { username, password } = req.body;
    const message = [];
    if (!validate.isString(username) || validate.isEmpty(username)) {
      message.push('username is required and must be a string');
    }
    if (!validate.isString(password) || validate.isEmpty(password)) {
      message.push('password is required and must be a string');
    }
    if (isEmpty(message)) {
      return next();
    }
    return res.status(400).send({
      status: 400,
      message,
    });
  }
}

export default Middleware;
