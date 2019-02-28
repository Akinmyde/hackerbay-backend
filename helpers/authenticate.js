import jwt from 'jsonwebtoken';

class Authenticate {
  /**
   * @description - this method encode a token
   *
   * @static
   * @param {int} userId
   * @param {string} userName
   * @returns {string} token
   * @memberof Authenticate
   */
  static encode(userId, userName) {
    const token = jwt.sign({ userId, userName }, process.env.SECRET, { expiresIn: '3000h' });
    return token;
  }

  /**
   *
   *
   * @static
   * @param {string} token
   * @returns {object} isVerify
   * @memberof Authenticate
   */
  static decode(token) {
    const isVerify = jwt.verify(token, process.env.SECRET);
    return isVerify;
  }
}

export default Authenticate;
