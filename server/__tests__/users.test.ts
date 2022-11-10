import request from 'supertest'
import app from '../app'
import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals'
import db from '../database.js'

describe('backend express user routes', () => {
  
  it('expect 1 to be 1', () => {
    expect(1).toBe(1);
  })
  
  afterAll((done) => {
    app.close(done)
  })
})
