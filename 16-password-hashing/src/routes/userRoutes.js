import { Router } from 'express';
import {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById
} from '../controllers/userController.js';

const userRoutes = Router();

userRoutes.post('/', createUser);
userRoutes.get('/', getUsers);
userRoutes.get('/:id', getUserById);
userRoutes.put('/:id', updateUserById);
userRoutes.delete('/:id', deleteUserById);

export default userRoutes;
