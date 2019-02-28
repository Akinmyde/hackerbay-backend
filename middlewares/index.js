import validate from 'validate.js';
import isEmpty from 'lodash.isempty';
import { decode } from '../helpers';

class Middleware {
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
