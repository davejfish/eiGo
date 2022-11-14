const { getUserByEmail } = require('../models/users');
const User = require('../models/users');


module.exports = class UserService {

  static async create({ email, password }) {
    let user = await getUserByEmail(email);
    if (user) {
      throw new Error('User already exists');
    }

    const passwordHash = await bcrypt.hash(
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
};
