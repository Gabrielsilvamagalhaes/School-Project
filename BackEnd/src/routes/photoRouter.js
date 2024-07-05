import express from 'express';

import photoController from '../controllers/PhotoController';
import loginRequired from '../middlewares/loginRequired';

const router = express.Router();

router.post('/photos',loginRequired, photoController.store);

export default router;
