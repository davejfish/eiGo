import { Router } from 'express';
import User from '../lib/models/users.js';
import UserService from '../lib/services/UserService.js';

const ONE_DAY_IN_MS = 1000 * 24 * 24 * 60;

export default Router()
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
      next(err);
    } 
  })
  .get('/me', async (req, res, next) => {
    try {
      console.log('inside get');
      res.json({
        message: 'we got something'
      });
    } catch (err) {
      next(err);
    }
  });

