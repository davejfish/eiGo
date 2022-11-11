const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const User = require('../models/users');
const UserService = require('../services/UserService');

const ONE_DAY_IN_MS = 1000 * 24 * 24 * 60;

module.exports = Router()
  .post('/sessions', async (req, res, next) => {
    try {
      // write out users
    } catch (err) {
      next(err);
    }

  });

