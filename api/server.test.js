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
  test('properly inserts a user with a username and password', async () => {
    const [id] = await db("users").insert({username: "flabba", password: "dabba"})
    let user = await db('users').where({id}).first()
    expect(user).toBeTruthy()
  })
  test("responds with the registered user", async () => {
    const [id] = await db("users").insert({username: "flabba", password: "dabba"})
    let user = await db('users').where({id}).first()
    expect(user).toMatchObject({username: "flabba", password: "dabba"})
  })
})


describe('[post] login endpoint authenticates user', () => {
  test('on login with invalid username, expect correct error message', async () => {
    let res = await request(server).post('/api/auth/login').send({ username: 'bobsy', password: '1234' })
      expect(res.body.message).toMatch('invalid credentials')
      res = await request(server).post('/api/auth/login').send({ username: 'bob', password: '12345' })
      expect(res.body.message).toMatch('invalid credentials')
  })
  test('on login with no username in body, expect correct error message', async () => {
    let res = await request(server).post('/api/auth/login').send({ username: 'bobsy'})
      expect(res.body.message).toMatch('username and password required')
    res = await request(server).post('/api/auth/login').send({ username: 'bob'})
      expect(res.body.message).toMatch('username and password required')
  })
})

test('sanity', () => {
  expect(true).toBe(true)
})



// codegrademvp