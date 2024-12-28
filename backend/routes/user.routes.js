import { Router } from "express";
import {
  getLoginUser,
  getPurchaseCourse,
  login,
  logout,
  purchaseCourse,
  signup,
} from "../controllers/user.controllers.js";

import { env_Vars } from "../config/envVars.js";
import { protectRoute_SECRET_TOKEN } from "../middlewars/protectRoute.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get(
  "/me",
  protectRoute_SECRET_TOKEN(env_Vars.USER_SECRET_TOKEN),
  getLoginUser
);
router.post(
  "/purchase",
  protectRoute_SECRET_TOKEN(env_Vars.USER_SECRET_TOKEN),
  purchaseCourse
);
router.get(
  "/getpurchase",
  protectRoute_SECRET_TOKEN(env_Vars.USER_SECRET_TOKEN),
  getPurchaseCourse
);
router.get(
  "/purchased/:userID/:courseId",
  protectRoute_SECRET_TOKEN(env_Vars.USER_SECRET_TOKEN),
  getPurchaseCourse
);



export default router;
