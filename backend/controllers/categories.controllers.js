import Category from "../models/categories.model.js";
import axios from "axios";
export const categoryRoutes = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Input validation
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Both title and description are required",
      });
    }

    if (description.length <= 8) {
      return res.status(400).json({
        success: false,
        message: "Description length should be at least 8 characters",
      });
    }

    // Check for duplicate title
    const existingCategory = await Category.findOne({ title });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category with this title already exists",
      });
    }

    // Create new category
    const newCategory = new Category({
      title,
      description,
    });

    await newCategory.save();

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    console.error("Error in Create Category Controller:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getCategoryRoutes = async (req, res) => {
  try {
    const categories = await Category.find();

    return res.status(200).json({ success: true, content: categories });
  } catch (error) {
    console.error("Error in GetCategoryRoutes Controller:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const categoryUpdateById = async (req, res) => {
  const { id } = req.params;
  try {
  } catch (error) {}
};

export const deleteCategoryById = async (req, res) => {
  try {
  } catch (error) {}
};
