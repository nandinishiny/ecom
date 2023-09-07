import express from 'express'
import { deleteUser, forgotPassword, getAllUser, getSingleUser, getUserDetails, loginUser, logoutUser, registerUser, resetPassword,  updateProfile, updateUserPassword, updateUserRole } from '../controllers/userController.js';
import { authorizedRoles, isAuthenticatedUser } from '../middleware/auth.js';
import { upload } from '../utils/multerFile.js';
const router = express.Router();

// ,authorizedRoles('admin')
router.post("/register",upload.single('avatar'),registerUser);
router.post("/login",loginUser);
router.get("/logout",logoutUser);
router.post("/password/forgot",forgotPassword);
router.put("/password/reset/:token",resetPassword);
router.get("/me",upload.single('avatar'),getUserDetails);//1
router.put("/password/update",updateUserPassword);//2
router.put("/me/update",updateProfile);//3 isAuthenticatedUser
router.get("/admin/users",getAllUser);//4 ,1
router.get("/admin/user/:id",getSingleUser);//5 ,2
router.put("/admin/user/:id",updateUserRole);//6 ,3
router.delete("/admin/user/:id",deleteUser);//7 ,4





export default router;