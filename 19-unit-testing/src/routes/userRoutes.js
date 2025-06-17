const express = require('express');
const users = require('../data/users');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(users);
});

router.get('/employed', (req, res) => {
  const employed = users.filter(u => u.isEmployed);
  res.json(employed);
});

router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// CREATE
router.post('/', (req, res) => {
  const { username, age, isEmployed, password } = req.body;
  if (!username || !age || isEmployed === undefined || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newUser = {
    id: users.length + 1,
    username,
    age,
    isEmployed,
    password
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// UPDATE
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex === -1) return res.status(404).json({ error: 'User not found' });

  // Gộp dữ liệu mới vào user cũ
  users[userIndex] = { ...users[userIndex], ...req.body };
  res.json(users[userIndex]);
});

// DELETE
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex === -1) return res.status(404).json({ error: 'User not found' });

  const deletedUser = users.splice(userIndex, 1);
  res.json(deletedUser[0]);
});

module.exports = router;
