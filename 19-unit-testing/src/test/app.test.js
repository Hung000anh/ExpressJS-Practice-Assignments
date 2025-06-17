const request = require('supertest');
const app = require('../index');

describe('User Routes', () => {
  test('GET /users should return all users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(10);
  });

  test('GET /users/employed should return only employed users', async () => {
    const res = await request(app).get('/users/employed');
    expect(res.statusCode).toBe(200);
    expect(res.body.every(u => u.isEmployed)).toBe(true);
  });

  test('GET /users/3 should return Charlie', async () => {
    const res = await request(app).get('/users/3');
    expect(res.statusCode).toBe(200);
    expect(res.body.username).toBe('Charlie');
  });

  test('GET /users/999 should return 404', async () => {
    const res = await request(app).get('/users/999');
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('User not found');
  });
});
