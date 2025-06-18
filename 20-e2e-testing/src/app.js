const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

module.exports = app;