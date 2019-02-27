import hash from 'password-hash';

class passwordHash {
  /**
   * @description - this method generate an hash for password
   *
   * @static
   * @param {string} password
   * @returns {string} hashedPassword
   * @memberof passwordHash
   */
  static generateHash(password) {
    const hashedPassword = hash.generate(password);
    return hashedPassword;
  }

  /**
   * @description - this method verify the hashed password
   *
   * @static
   * @param {string} userPassword
   * @param {string} hashedPassword
   * @returns {boolean} isVerified
   * @memberof passwordHash
   */
  static verifyHash(userPassword, hashedPassword) {
    const isVerified = hash.verify(userPassword, hashedPassword);
    return isVerified;
  }
}

export default passwordHash;
