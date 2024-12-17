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

router.post("/mycourses", protectRoute, createCourses); // Create a course
router.patch("/courses/:id", protectRoute, updateCourseById); // Update course by ID
router.delete("/courses/:id", protectRoute, deleteCourseById); // Delete course by ID
router.get("/courses", getAllCourses); // Get all courses (public route)
router.get("/courses/:id", getCourseById); // Get course details by ID (public route)

export default router;
