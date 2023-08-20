import express from 'express';
import { uploadImage } from '../controllers/courouselController.js';

const router = express.Router();

router.post('/corousel', uploadImage);

export default router;
