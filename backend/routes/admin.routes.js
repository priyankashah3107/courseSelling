// Admin can create route delete route and update route
// admin protect route
// admin auth

// tasks
// 1. register and login herself / himself
//2 admin can create, update and delete the course
// admin can see their create course in admin dashboard

import { Router } from "express";
import {
  getAdminLoginUser,
  login,
  logout,
  signup,
} from "../controllers/admin.controllers.js";
import { protectRoute_SECRET_TOKEN } from "../middlewars/protectRoute.js";
import { env_Vars } from "../config/envVars.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.delete("/logout", logout);
router.get(
  "/me",
  protectRoute_SECRET_TOKEN(env_Vars.ADMIN_SECRET_TOKEN),
  getAdminLoginUser
); // this is validate via adminProtect Route

export default router;
