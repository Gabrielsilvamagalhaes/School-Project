import express from "express";
import tokenController from '../controllers/TokenController';

const router = express.Router();

router.post('/tokens/', tokenController.create);



export default router;
