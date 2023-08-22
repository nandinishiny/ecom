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
router.get("/me",isAuthenticatedUser,upload.single('avatar'),getUserDetails);
router.put("/password/update",isAuthenticatedUser,updateUserPassword);
router.put("/me/update",isAuthenticatedUser,updateProfile);
router.get("/admin/users",isAuthenticatedUser,authorizedRoles('admin'),getAllUser);
router.get("/admin/user/:id",isAuthenticatedUser,authorizedRoles('admin'),getSingleUser);
router.put("/admin/user/:id",isAuthenticatedUser,authorizedRoles('admin'),updateUserRole);
router.delete("/admin/user/:id",isAuthenticatedUser,authorizedRoles('admin'),deleteUser);





export default router;