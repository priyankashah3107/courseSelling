import { Router } from "express";
import {
  getLoginUser,
  login,
  logout,
  signup,
} from "../controllers/user.controllers.js";
import { protectRoute } from "../middlewars/protectRoute.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", protectRoute, getLoginUser);

export default router;
