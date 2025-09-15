import express from "express";
import { createProduct, getAllProducts, getProductById } from "../controllers/product.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";
const router = express.Router();
router.post("/", protectRoute, createProduct);
router.get("/", getAllProducts); // GET /api/products?category=...&page=...
router.get("/:id", getProductById); // GET /api/products/some_id

export default router;