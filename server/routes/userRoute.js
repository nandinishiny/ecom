import express from 'express'
import { deleteUser, forgotPassword, getAllUser, getSingleUser, getUserDetails, loginUser, logoutUser, registerUser, resetPassword,  updateProfile, updateUserPassword, updateUserRole } from '../controllers/userController.js';
import { authorizedRoles, isAuthenticatedUser } from '../middleware/auth.js';
import { upload } from '../utils/multerFile.js';
const router = express.Router();


router.post("/register",upload.single('avatar'),registerUser);
router.post("/login",loginUser);
router.get("/logout",logoutUser);
router.post("/password/forgot",forgotPassword);
router.put("/password/reset/:token",resetPassword);
router.get("/me",upload.single('avatar'),getUserDetails);//1
router.put("/password/update",updateUserPassword);//2
router.put("/me/update",updateProfile);//3 isAuthenticatedUser
router.get("/admin/users",authorizedRoles('admin'),getAllUser);//4
router.get("/admin/user/:id",authorizedRoles('admin'),getSingleUser);//5
router.put("/admin/user/:id",authorizedRoles('admin'),updateUserRole);//6
router.delete("/admin/user/:id",authorizedRoles('admin'),deleteUser);//7





export default router;