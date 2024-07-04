import express from 'express';
import multer from 'multer';

import photoController from '../controllers/PhotoController';
import multerConfig from '../config/multer';

const upload = multer(multerConfig);

const router = express.Router();

router.post('/photos', upload.single('photo'), photoController.store);

export default router;
