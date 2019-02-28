import validate from 'validate.js';
import isEmpty from 'lodash.isempty';

class Middleware {
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
