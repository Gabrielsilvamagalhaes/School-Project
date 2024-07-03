import express from "express";
import userController from '../controllers/UserController';

const router = express.Router();

router.post('/user/register', userController.create);
router.put('/user/update/:id', userController.update);
router.delete('/user/delete/:id', userController.delete);
router.get('/users', userController.index);
router.get('/users/:name', userController.indexByName);
router.get('/user/:id', userController.show);

export default router;
