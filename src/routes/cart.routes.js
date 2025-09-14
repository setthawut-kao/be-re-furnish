import express from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
} from "../controllers/cart.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/me", protectRoute, getCart);
router.post("/me", protectRoute, addToCart);
router.delete("/me/:productId", protectRoute, removeFromCart);

export default router;
