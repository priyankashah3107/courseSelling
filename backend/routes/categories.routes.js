import { Router } from "express";
import { protectRoute } from "../middlewars/protectRoute.js";
import {
  categoryRoutes,
  categoryUpdateById,
  deleteCategoryById,
  getCategoryById,
  getCategoryRoutes,
} from "../controllers/categories.controllers.js";

const router = Router();

router.post("/mycategories", categoryRoutes);
router.get("/getcategories", getCategoryRoutes);
router.patch("/updatecategory/:id", categoryUpdateById);
router.delete("/deletecategory/:id", deleteCategoryById);
router.get("/getcategories/:id", getCategoryById);

export default router;
