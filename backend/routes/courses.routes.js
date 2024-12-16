import { Router } from "express";
import { protectRoute } from "../middlewars/protectRoute.js";
import {
  createCourses,
  deleteCourseById,
  getAllCourses,
  getCourseById,
  updateCourseById,
} from "../controllers/course.controllers.js";

// const router = Router();

// router.post("/courses", protectRoute, createCourses);
// router.patch("/courses",protectRoute, updateCourses);
// router.patch("/courses/:id", protectRoute, updateCourseById)
// router.delete("courses/:id", protectRoute, deleteCourseById)
// router.get("/getallcourses", getAllCourses); // anyone can see the my all courses on Landingpage so we don't need a protectRoute
// router.get("/courses/:id", getCourseById); // anyone can access by clicking on the buynow button without protectRoute we only need protect route when we try to make payment

// export default router;

const router = Router();

router.post("/courses", protectRoute, createCourses); // Create a course
router.patch("/courses/:id", protectRoute, updateCourseById); // Update course by ID
router.delete("/courses/:id", protectRoute, deleteCourseById); // Delete course by ID
router.get("/courses", getAllCourses); // Get all courses (public route)
router.get("/courses/:id", getCourseById); // Get course details by ID (public route)

export default router;
