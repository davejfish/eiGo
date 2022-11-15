import request from 'supertest';
import app from '../app';
import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import db from '../database.js';
import { setgroups } from 'process';
import pool from '../database.js';
import setupDb from '../setup-data';

const mockUser = {
  email: 'test@example.com',
  password: '123456'
};

const registerAndLogin = async (props = {}) => {
  const testUser = {
    ...mockUser,
    ...props,
  };

  const agent = request.agent(app);
  const response = await agent.post('/users/sessions/sign-up').send(testUser);
  const user = response.body;

  return [agent, user];
};

describe('backend express user routes', () => {
  beforeEach(() => {
    setupDb();
  });

  it('#POST /api/v1/users/sessions/sign-up should create and login a new user', async () => {
    const response = await request(app).post('/users/sessions/sign-up').send(mockUser);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: expect.any(String),
      user: expect.any(String),
    });
  });

  it('#POST /sessions/sign-in should sign in an existing user', async () => {
    const response = await request(app).post('/users/sessions/sign-in').send({
      email: 'testUser@test.com',
      password: '123456'
    });
    expect(response.status).toBe(200);
  });

  it('#GET /me should return the current user', async () => {
    const [agent, user] = await registerAndLogin();
    const response = await agent.get('/users/me');
    expect(response.body).toEqual({
      id: expect.any(String),
      email: 'test@example.com',
      username: null,
    });
  });

});
