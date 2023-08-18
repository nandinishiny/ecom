import express from "express";
import { createCorousel } from "../controllers/courouselController.js";

const router = express.Router();
router.post("/corousel", createCorousel);
export default router;
