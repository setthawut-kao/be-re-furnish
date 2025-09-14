import express from "express";
import {
  signUp,
  login,
  logout,
  getProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", login);
router.post("/logout", logout);
router.get("/profile", protectRoute, getProfile);

export default router;
