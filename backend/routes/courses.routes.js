import { Router } from "express";
import { protectRoute } from "../middlewars/protectRoute.js";
import {
  createCourses,
  deleteCourseById,
  getAllCourses,
  getCourseById,
  updateCourseById,
} from "../controllers/course.controllers.js";

const router = Router();

router.post("/mycourses", createCourses); // Create a course
router.get("/getcourses", getAllCourses); // Get all courses (public route)
router.patch("/updatecourse/:id", updateCourseById); // Update course by ID
router.delete("/deletecourses/:id", deleteCourseById); // Delete course by ID
// router.get("/particulatcourse/:id", getCourseById); // Get course details by ID (public route)

export default router;
