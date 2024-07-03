import express from "express";
import userController from '../controllers/UserController';

const router = express.Router();

router.get('/user/register', userController.create);

export default router;
