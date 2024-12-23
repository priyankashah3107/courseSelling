// Admin can create route delete route and update route
// admin protect route
// admin auth

// tasks
// 1. register and login herself / himself
//2 admin can create, update and delete the course
// admin can see their create course in admin dashboard

import { Router } from "express";
import { login, logout, signin } from "../controllers/admin.controllers.js";

const router = Router();

router.post("/signin", signin);
router.post("/login", login);
router.delete("/logout", logout);
// router.get("/me", isAdmin) // this is validate via adminProtect Route

export default router;
