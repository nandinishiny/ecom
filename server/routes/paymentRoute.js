import express from 'express';
import { checkout, paymentVerify } from '../controllers/paymentController.js';
const router = express.Router();

router.post("/checkout",checkout);
router.post("/paymentverification",paymentVerify);



export default router;