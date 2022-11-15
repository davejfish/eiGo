import User from '../models/Users.js';
import bcrypt from 'bcrypt';

export default class UserService {

  static async create({ email, password }) {
    let user = await User.getUserByEmail(email);
    if (user) {
      throw new Error('User already exists');
    }

    const passwordhash = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS),
    );

    user = await User.insert({
      email,
      passwordhash,
    });

    const token = await User.signIn(user);
    return [user, token];
  }

  static async getUser({ email }) {
    const currentUser = User.getUserByEmail(email);
    if (currentUser) {
      return currentUser;
    }
    return null;
  }

  static checkPassword(password, user) {
    if (!bcrypt.compareSync(password, user.passwordhash))
      throw new Error('invalid credentials');
  }

};
