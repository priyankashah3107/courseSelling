import mongoose from "mongoose";
import Category from "../models/categories.model.js";
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
  const { description } = req.body;

  try {
    if (!description) {
      return res
        .status(400)
        .json({ success: false, message: "Description is required feild" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Category Id" });
    }
    const updatecategory = await Category.findByIdAndUpdate(
      id,
      { description },
      { new: true, runValidators: true }
    );

    if (!updatecategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    await updatecategory.save();

    return res.status(200).json({
      success: true,
      message: "successfully update the Description of the Category",
      updatecategory,
    });
  } catch (error) {
    console.error("Error in GetCategoryRoutes Controller:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getCategoryById = async (req, res) => {
  const { id } = req.params;
  console.log("getCategoryById", id);
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid Id" });
    }
    const getCategoryWithId = await Category.findById(id);

    return res.status(200).json({
      success: true,
      message: "Successfully get the category with id",
      content: getCategoryWithId,
    });
  } catch (error) {
    console.error("Error in GetCategoryRoutes Controller:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteCategoryById = async (req, res) => {
  const { id } = req.params;
  console.log("DeleteCategoryById", id);
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Delete CategoryID" });
    }

    const deleteCategorywithId = await Category.findByIdAndDelete(id);

    if (!deleteCategorywithId) {
      // this will handle the null id what if this id is not exist in the db
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Successfully delete the Category with Id",
      deleteCategorywithId,
    });
  } catch (error) {
    console.error("Error in GetCategoryRoutes Controller:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
