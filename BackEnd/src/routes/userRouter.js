import express from "express";
import userController from '../controllers/UserController';

import loginRequired from '../middlewares/loginRequired'


const router = express.Router();

router.post('/user/register', userController.create);
router.put('/user/update/', loginRequired, userController.update);
router.delete('/user/delete/', loginRequired, userController.delete);


//router.get('/users', loginRequired, userController.index);
//router.get('/users/:name', userController.indexByName);
//router.get('/user/:id', userController.show);

export default router;
