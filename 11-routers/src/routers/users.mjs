import users from '../utils/constant.mjs';
import { Router } from 'express';
import { searchUserValidator, createUserValidator, updateUserValidator, userIdParamValidator} from '../middleware/userValidator.mjs';
import { validate } from '../middleware/validate.mjs';

let userList = [...users];
let userRouter = Router();

// Get /user (filter name, employee)
userRouter.get('/users', searchUserValidator, validate, (req, res) => {

  let filteredUsers = [...userList];
  const { name, isEmployed } = req.query;

  if (name) {
    filteredUsers = filteredUsers.filter(user =>
      user.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (isEmployed !== undefined) {
    const employedBool = isEmployed === 'true';
    filteredUsers = filteredUsers.filter(user => user.isEmployed === employedBool);
  }

  res.json(filteredUsers);
});

// POST /users
userRouter.post('/users', createUserValidator, validate, (req, res) => {
  const { name, age, isEmployed } = req.body;
  const newUser = {
    id: userList.length ? userList[userList.length - 1].id + 1 : 1,
    name,
    age,
    isEmployed
  };
  userList.push(newUser);
  res.status(201).json(newUser);
});

// PATCH /users/:id
userRouter.patch('/users/:id', userIdParamValidator, updateUserValidator, validate, (req, res) => {
  const id = Number(req.params.id);
  const user = userList.find(u => u.id === id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  Object.assign(user, req.body);
  res.json(user);
});

// PUT /users/:id
userRouter.put('/users/:id', userIdParamValidator, createUserValidator, validate, (req, res) => {
  const id = Number(req.params.id);
  const index = userList.findIndex(u => u.id === id);
  if (index === -1) return res.status(404).json({ message: 'User not found' });

  const { name, age, isEmployed } = req.body;
  userList[index] = { id, name, age, isEmployed };
  res.json(userList[index]);
});

// DELETE /users/:id
userRouter.delete('/users/:id', userIdParamValidator, validate, (req, res) => {
  const id = Number(req.params.id);
  const index = userList.findIndex(u => u.id === id);
  if (index === -1) return res.status(404).json({ message: 'User not found' });

  const deletedUser = userList.splice(index, 1);
  res.json({ message: 'User deleted', user: deletedUser[0] });
});

export default userRouter;