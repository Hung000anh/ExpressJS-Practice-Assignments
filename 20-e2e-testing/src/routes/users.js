const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router;
