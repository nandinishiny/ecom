import express from "express";
import { isAuthenticatedUser,authorizedRoles } from "../middleware/auth.js";
import { deleteOrders, getAllOrders, getSingleOrder, myOrders, newOrder, updateOrderStatus } from "../controllers/orderController.js";
const router = express.Router();

router.post("/order/new",isAuthenticatedUser,newOrder);
router.get("/order/:id",isAuthenticatedUser,getSingleOrder);
router.post("/orders/me",isAuthenticatedUser,myOrders);
router.get("/admin/orders",isAuthenticatedUser,authorizedRoles('admin'),getAllOrders);
router.put("/admin/orders/:id",isAuthenticatedUser,authorizedRoles('admin'),updateOrderStatus);
router.delete("/admin/order/:id",isAuthenticatedUser,authorizedRoles("admin"),deleteOrders);



export default router;
