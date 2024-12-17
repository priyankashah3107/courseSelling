import { Router } from "express";
import { protectRoute } from "../middlewars/protectRoute.js";
import {
  categoryRoutes,
  categoryUpdateById,
  deleteCategoryById,
  getCategoryRoutes,
} from "../controllers/categories.controllers.js";

const router = Router();

router.post("/mycategories", categoryRoutes); // Create a category
router.get("/getcategories", getCategoryRoutes); // Fetch all categories
router.patch("/categories/:id", categoryUpdateById); // Update category by ID
router.delete("/categories/:id", deleteCategoryById); // Delete category by ID

export default router;
