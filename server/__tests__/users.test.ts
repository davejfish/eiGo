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
    // setup the pool
    // setup(pool);
  });
  
  it('expect 1 to be 1', () => {
    expect(1).toBe(1);
  });

  it('#POST /api/v1/users/sessions/sign-up should create and login a new user', async () => {
    const response = await request(app).post('/api/v1/users/sessions/sign-up').send(mockUser);
    console.log('response.body is: ', response.body);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: expect.any(String),
      username: null,
      email: 'test@example.com'
    });
  });
  
  afterAll((done) => {
    // end the pool - pool.end()
    app.close(done);
  });
});
