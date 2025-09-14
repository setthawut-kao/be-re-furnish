import express from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
  clearItemsFromCart,
} from "../controllers/cart.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/me", protectRoute, addToCart);
router.get("/me", protectRoute, getCart);
router.delete("/me/clear-items", protectRoute, clearItemsFromCart);
router.delete("/me/:productId", protectRoute, removeFromCart);

export default router;
