const { Router } = require('express');
const User = require('../models/users');
const UserService = require('../services/UserService');

const ONE_DAY_IN_MS = 1000 * 24 * 24 * 60;

module.exports = Router()
  .post('/sessions/sign-up', async (req, res, next) => {
    try {
      // write out users
      console.log('req is: ', req.body);
      const [user, token] = await UserService.create(req.body);

      res
        .cookie(process.env.COOKIE_NAME, token, {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
        })
        .json({
          message: 'successfully signed in',
          user: token,
        });
    } catch (err) {
      console.log(err);
      next(err);
    }

  });

