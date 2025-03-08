const request = require('supertest');
const app = require('../server'); // Adjust the path as necessary
const User = require('../models/User');

describe('Authentication Routes', () => {
  beforeAll(async () => {
    await User.deleteMany({}); // Clear the database before tests
  });

  afterAll(async () => {
    await User.deleteMany({}); // Clear the database after tests
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/signup')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toBe('User registered successfully!');
  });

  it('should not register a user with an existing email', async () => {
    await request(app)
      .post('/signup')
      .send({
        username: 'testuser2',
        email: 'testuser@example.com',
        password: 'password123'
      });
    const res = await request(app)
      .post('/signup')
      .send({
        username: 'testuser3',
        email: 'testuser@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('User already exists!');
  });

  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should not login with invalid credentials', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email: 'testuser@example.com',
        password: 'wrongpassword'
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('Invalid credentials!');
  });
});
