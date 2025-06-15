import { Router } from 'express';
import {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById, 
  loginUser,
  getUserStatus
} from '../controllers/userController.js';

const userRoutes = Router();

userRoutes.post('/login', loginUser); // Route đăng nhập
userRoutes.get('/status', getUserStatus);
userRoutes.post('/', createUser);
userRoutes.get('/', getUsers);
userRoutes.get('/:id', getUserById);
userRoutes.put('/:id', updateUserById);
userRoutes.delete('/:id', deleteUserById);
userRoutes.post('/', createUser);

export default userRoutes;
