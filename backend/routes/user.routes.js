import { Router } from "express";
import {
  getLoginUser,
  login,
  logout,
  purchaseCourse,
  signup,
} from "../controllers/user.controllers.js";
import { protectRoute } from "../middlewars/protectRoute.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/purchase", protectRoute, purchaseCourse);
router.get("/getpurchase", protectRoute, getPurchaseCourse)
router.get("/me", protectRoute, getLoginUser);

export default router;
