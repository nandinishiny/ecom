import express from 'express';
import { createProduct, createProductReview, deleteProduct, deleteReview, getAllProducts, getProductReviews, getSingleProduct, updateProduct } from '../controllers/productController.js';
import { authorizedRoles, isAuthenticatedUser } from '../middleware/auth.js';
const router = express.Router();
import {upload} from '../utils/multerFile.js'
import multer from 'multer';

router.post("/product/new",isAuthenticatedUser,authorizedRoles("admin"),upload.array('images'),createProduct);
// router.post("/product/new",createProduct);
router.get("/products",getAllProducts);
router.put("/product/:id",isAuthenticatedUser,updateProduct);
router.delete("/product/:id",isAuthenticatedUser,deleteProduct);
// router.get("/product/:id",isAuthenticatedUser,getSingleProduct);
router.get("/product/:id",getSingleProduct);
router.put("/review",isAuthenticatedUser,createProductReview);
router.get("/reviews",getProductReviews);//get all reviews of a product
router.delete("/reviews",isAuthenticatedUser,deleteReview);//delete a product review





export default router;