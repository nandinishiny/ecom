import express from 'express';
import { createProduct, createProductReview, deleteProduct, deleteReview, getAllProducts, getProductReviews, getSingleProduct, updateProduct } from '../controllers/productController.js';
import { authorizedRoles, isAuthenticatedUser } from '../middleware/auth.js';
const router = express.Router();
import {upload} from '../utils/multerFile.js'
import multer from 'multer';

router.post("/product/new",authorizedRoles("admin"),upload.array('images'),createProduct);
// isAuthenticatedUser
// router.post("/product/new",createProduct);
router.get("/products",getAllProducts);
router.put("/product/:id",updateProduct);
router.delete("/product/:id",deleteProduct);
// router.get("/product/:id",isAuthenticatedUser,getSingleProduct);
router.get("/product/:id",getSingleProduct);
router.put("/review",createProductReview);
router.get("/reviews",getProductReviews);//get all reviews of a product
router.delete("/reviews",deleteReview);//delete a product review





export default router;