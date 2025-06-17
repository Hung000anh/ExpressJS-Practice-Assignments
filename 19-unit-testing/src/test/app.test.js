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

  test('POST /users should create a new user', async () => {
    const newUser = {
      username: 'TestUser',
      age: 26,
      isEmployed: true,
      password: 'testpass'
    };

    const res = await request(app)
      .post('/users')
      .send(newUser);

    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject(newUser);
    expect(res.body.id).toBeDefined();
  });

  test('PUT /users/:id should update a user', async () => {
    const updateData = {
      age: 29,
      isEmployed: false
    };

    const res = await request(app)
      .put('/users/1')
      .send(updateData);

    expect(res.statusCode).toBe(200);
    expect(res.body.age).toBe(29);
    expect(res.body.isEmployed).toBe(false);
  });

  test('DELETE /users/:id should delete a user', async () => {
    const res = await request(app).delete('/users/1');

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(1);
  });

  test('GET /users/:id should return 404 if user not found', async () => {
    const res = await request(app).get('/users/999');
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('User not found');
  });
});
