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
  const response = await agent.post('/api/v1/users').send(testUser);
  const user = response.body;

  return [agent, user];
};

describe('backend express user routes', () => {
  beforeEach(() => {
    setupDb();
  });
  
  it('expect 1 to be 1', () => {
    expect(1).toBe(1);
  });

  it('#POST /api/v1/users/sessions/sign-up should create and login a new user', async () => {
    const response = await request(app).post('/users/sessions/sign-up').send(mockUser);
    console.log('response.body is: ', response.body);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: expect.any(String),
      user: expect.any(String),
    });
  });

});
