const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const app = require('../../src/app');
const User = require('../../src/models/User');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await User.deleteMany();
});

test('should create and get users', async () => {
  await request(app).post('/api/users').send({ name: 'Alice', email: 'alice@example.com' });
  const res = await request(app).get('/api/users');
  expect(res.body).toHaveLength(1);
  expect(res.body[0].name).toBe('Alice');
});
