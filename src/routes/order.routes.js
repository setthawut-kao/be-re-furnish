import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
} from "../controllers/order.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/", protectRoute, createOrder);
router.get("/me", protectRoute, getMyOrders);
router.get("/:orderId", protectRoute, getOrderById);

export default router;
