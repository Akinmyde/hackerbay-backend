/* eslint-disable consistent-return */
import { generateHash, verifyHash, encode } from '../helpers';
import pool from '../config';


class authController {
  /**
   * @description - this method creates a user
   *
   * @param {object} req - The request payload sent to the router
   * @param {object} res - The response payload sent back from the controller
   *
   * @returns {object} - status message and response
   */
  static async signUp(req, res) {
    const client = await pool.connect();
    try {
      const { username, password } = req.body;
      const hashedPassword = generateHash(password.trim());
      const signUpUserQuery = { text: 'INSERT INTO users(username, password) VALUES($1, $2) RETURNING *', values: [username.trim(), hashedPassword] };
      const user = await client.query(signUpUserQuery);
      const { rows } = user;
      if (rows) {
        const token = encode(rows[0].id, rows[0].isadmin);
        return res.send({ status: 201, token, message: 'Registration was successfull' });
      } return res.send({ status: 204, error: 'User account not created, try again' });
    } catch (err) {
      const { constraint } = err;
      if (constraint === 'users_username_key') {
        res.status(409).send({ status: 409, message: 'Username already exists' });
      } else {
        return res.status(500).send({ status: 500, message: 'Internal server error' });
      }
    } finally { await client.release(); }
  }

  /**
* @description - this method sign-in a user
*
* @param {object} req - The request payload sent to the router
* @param {object} res - The response payload sent back from the controller
*
* @returns {object} - status message and response
*/
  static async login(req, res) {
    const client = await pool.connect();
    try {
      const { username, password } = req.body;
      const loginQuery = { text: 'SELECT * FROM users WHERE username = $1', values: [username.trim()] };
      const user = await client.query(loginQuery);
      const { rows, rowCount } = user;
      if (rowCount === 0) { return res.status(401).send({ status: 401, message: 'Invalid username or password' }); }
      if (verifyHash(password.trim(), rows[0].password)) {
        const token = encode(rows[0].id, rows[0].isadmin);
        const updateQuery = { text: 'UPDATE users SET lastlogin = CURRENT_DATE WHERE id = $1', values: [rows[0].id] };
        await client.query(updateQuery);
        return res.status(200).send({ status: 200, token, message: 'Login was successful' });
      } return res.status(401).send({ status: 401, message: 'Invalid username or password' });
    } catch (err) { return res.status(500).send({ status: 500, message: 'Internal server error' }); } finally { await client.release(); }
  }
}

export default authController;
