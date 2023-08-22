//these route didn't included in project
import express from 'express';
import multer from 'multer';
import path from 'path';
import { upload } from '../utils/multerFile.js';
import { uploadImage } from '../controllers/courouselController.js';
const router = express.Router();


// Handle file upload route
router.post('/corousel', upload.array('images'),uploadImage )
export default router;