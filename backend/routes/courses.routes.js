import { Router } from "express";

import {
  createCourses,
  deleteCourseById,
  getAllCourses,
  getCourseById,

  getCoursesByUserId,
  updateCourseById,
} from "../controllers/course.controllers.js";
import { protectRoute_SECRET_TOKEN } from "../middlewars/protectRoute.js";
import { env_Vars } from "../config/envVars.js";

const router = Router();

// router.post(
//   "/mycourses",
//   protectRoute_SECRET_TOKEN(env_Vars.USER_SECRET_TOKEN),
//   createCourses
// ); // Create a course


router.post(
  "/mycourses",
  protectRoute_SECRET_TOKEN(env_Vars.ADMIN_SECRET_TOKEN),
  createCourses
); 
router.get("/getcourses", getAllCourses); // Get all courses (public route)
router.patch("/updatecourse/:id", protectRoute_SECRET_TOKEN(env_Vars.ADMIN_SECRET_TOKEN), updateCourseById); // Update course by ID
router.delete("/deletecourses/:id", protectRoute_SECRET_TOKEN(env_Vars.ADMIN_SECRET_TOKEN),  deleteCourseById); // Delete course by ID
router.get("/particulatcourse/:id", getCourseById); // Get course details by ID (public route)
router.get("/courseadmin", protectRoute_SECRET_TOKEN(env_Vars.ADMIN_SECRET_TOKEN), getCoursesByUserId); // Get course details by ID (public route)


export default router;
