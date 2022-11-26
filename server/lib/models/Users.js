import jwt from 'jsonwebtoken';
import pool  from '../../database.js';


export default class User {
  id;
  username;
  email;
  #passwordhash;

  constructor({ id, username, email, passwordhash }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.#passwordhash = passwordhash;
  }

  static async insert({ username = null, email, passwordhash }) {
    const { rows } = await pool.query(`
      INSERT INTO eigo_users
      (username, email, passwordhash)
      VALUES ($1, $2, $3)
      RETURNING *`, [username, email, passwordhash]);
    return new User(rows[0]);
  }

  static async updateUserByID(id, update) {
    const oldUser = await User.getUserByID(id);
    const newUser = {
      ...oldUser,
      ...update,
      passwordhash: oldUser.passwordhash
    };
    const { rows } = await pool.query(`
      UPDATE eigo_users
      SET username = $1, email = $2, passwordhash = $3
      WHERE id = $4 RETURNING *`, [newUser.username, newUser.email, newUser.passwordhash, id]);
    return new User(rows[0]);
  }

  static async signIn(user) {
    const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
      expiresIn: '1 day',
    });
    return token;
  }

  static async getUserByID(id) {
    const { rows } = await pool.query(`
      SELECT * FROM eigo_users
      WHERE id = $1`, [id]);
    if (!rows[0]) return null;
    return new User(rows[0]);
  }

  static async getUserByEmail(email) {
    const { rows } = await pool.query(`
      SELECT * FROM eigo_users
      WHERE email = $1`, [email]);
    if (!rows[0]) return null;
    return new User(rows[0]);
  }

  get passwordhash() {
    return this.#passwordhash;
  }

};
