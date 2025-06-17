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

module.exports = router;
