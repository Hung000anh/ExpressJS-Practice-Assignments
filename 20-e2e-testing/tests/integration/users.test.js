const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const app = require('../../src/app');
const User = require('../../src/models/User');

// 👇 Khai báo biến mongoServer ở đây
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create(); // ✅ gán giá trị
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop(); // ✅ biến này giờ đã tồn tại
});

beforeEach(async () => {
  await User.deleteMany();
});

test('should create and get users', async () => {
  await request(app)
    .post('/api/users')
    .send({ name: 'Alice', email: 'alice@example.com' });

  const res = await request(app).get('/api/users');

  expect(res.body).toHaveLength(1);
  expect(res.body[0].name).toBe('Alice');
});
