import { Router } from "express";
import { protectRoute } from "../middlewars/protectRoute.js";
import {
  categoryRoutes,
  categoryUpdateById,
  deleteCategoryById,
  getCategoryRoutes,
} from "../controllers/categories.controllers.js";
// const router = Router()

// router.post("/categories", protectRoute, categoryRoutes)
// router.get("/categories", protectRoute, getCategoryRoutes)
// router.patch("/category/:id", protectRoute, categoryUpdateById)
// router.delete("/delete", protectRoute, deleteCategory)

// export default router;

const router = Router();

router.post("/categories", protectRoute, categoryRoutes); // Create a category
router.get("/categories", getCategoryRoutes); // Fetch all categories
router.patch("/categories/:id", protectRoute, categoryUpdateById); // Update category by ID
router.delete("/categories/:id", protectRoute, deleteCategoryById); // Delete category by ID

export default router;
