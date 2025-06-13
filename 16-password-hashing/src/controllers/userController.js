import User from '../models/User.js';
import { hashPassword } from '../utils/hash.js';

// create users
export const createUser = async (req, res) => {
  try {
    // Hash password
    const saltRounds = 10;

    const hashedPassword = await hashPassword(req.body.password);

    // create user with password hashed
    const newUser = new User({
      ...req.body,
      password: hashedPassword
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// get users
export const getUsers = async (request, response) => {
  try {
    const users = await User.find();
    response.json(users);
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
};

// get user by Id
export const getUserById = async (request, response) => {
  try {
    const user = await User.findById(request.params.id);
    if (!user) return response.status(404).json({ error: 'User does not exist' });
    response.json(user);
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
};

// Update user by Id
export const updateUserById = async (request, response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true, runValidators: true }
    );
    if (!updatedUser) return response.status(404).json({ error: 'User does not exist' });
    response.json(updatedUser);
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
};

// Delete user by Id
export const deleteUserById = async (request, response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(request.params.id);
    if (!deletedUser) return response.status(404).json({ error: 'User does not exist' });
    response.json({ message: 'Xoá thành công' });
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
};
