import express from "express";
import { Router } from "express";
import userController from '../controllers/userController.js'; 
import { authenticateToken } from "../middleware/authMiddleware.js";

const userRouter = Router();

userRouter.post('/register', userController.registerUser);

userRouter.post('/login', userController.loginUser);

userRouter.get('/userlist', userController.getUsers);

userRouter.get('/profile', authenticateToken, userController.getUser);

userRouter.put('/profile',authenticateToken, userController.updateUser);

export default userRouter;
