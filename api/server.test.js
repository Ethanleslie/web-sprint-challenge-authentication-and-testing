// Write your tests here
const request = require('supertest')
const db = require('../data/dbConfig')
const server = require("../api/server")






beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async () => {
  await db('users').truncate()
})

afterAll(async () => {
  await db.destroy()
})

describe('[post] register endpoint returns the correct response', () => {
  test('response body should have, id, username and hashed password on correct login', () => {
    
  })
})

test('sanity', () => {
  expect(true).toBe(true)
})