import express from "express";
import { isAuthenticatedUser,authorizedRoles } from "../middleware/auth.js";
import { deleteOrders, getAllOrders, getSingleOrder, myOrders, newOrder, updateOrderStatus } from "../controllers/orderController.js";
const router = express.Router();
// isAuthenticatedUser
// authorizedRoles('admin'),
router.post("/order/new",newOrder);//1
router.get("/order/:id",getSingleOrder);//2
router.post("/orders/me",isAuthenticatedUser,myOrders);
router.get("/admin/orders",getAllOrders);//3 
router.put("/admin/orders/:id",updateOrderStatus);//4,1
router.delete("/admin/order/:id",deleteOrders);//5,2



export default router;
