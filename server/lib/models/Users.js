const { default: pool } = require('../../database');


module.exports = class User {
  id;
  username;
  email;
  #passwordhash;

  constructor({ id, username, email, passwordhash }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.passwordhash = passwordhash;
  }

  static async insert({ username = null, email, passwordhash }) {
    const { rows } = await pool.query(`
      INSERT INTO eigo_users
      (username, email, passwordhash)
      VALUES ($1, $2, $3)
      RETURNING *`, [username, email, password]);
    return new User(rows[0]);
  }

  static async signIn(user) {
    const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
      expiresIn: '1 day',
    });
    return token;
  }

  static async getUserByEmail(email) {
    const { rows } = await pool.query(`
      SELECT * FROM eigo_users
      WHERE email = $1`, [email]);
    if (!rows[0]) return null;
    return new User(rows[0]);
  }

};
