import { Router } from 'express';
import User from '../lib/models/users.js';
import UserService from '../lib/services/UserService.js';
import authenticate from '../middleware/authenticate.js';

const ONE_DAY_IN_MS = 1000 * 24 * 24 * 60;

export default Router()
  .post('/sessions/sign-up', async (req, res, next) => {
    try {
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
  .post('/sessions/sign-in', async (req, res, next) => {
    try {
      const user = await UserService.getUser(req.body);
      UserService.checkPassword(req.body.password, user);
      const token = await User.signIn(user);
      res
        .cookie(process.env.COOKIE_NAME, token, {
          httpOnly: true,
          secure: process.env.SECURE_COOKIES === 'true',
          sameSite: process.env.SECURE_COOKIES === 'true' ? 'none' : 'strict',
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
  .get('/me', authenticate, (req, res, next) => {
    try {
      res.json(req.user);
    } catch (err) {
      next(err);
    }
  })
  .put('/:id', authenticate, async (req, res, next) => {
    try {
      const response = await User.updateUserByID(req.params.id, req.body);
      res.json(response);
    } catch (err) {
      next(err);
    }
  })
  .delete('/sessions', (req, res, next) => {
    try {
      res
        .clearCookie(process.env.COOKIE_NAME, {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
        })
        .status(204)
        .send({
          message: 'Successfully signed out',
        });
    } catch (err) {
      next(err);
    }
  });

