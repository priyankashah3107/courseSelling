import mongoose from "mongoose";
import User from "../models/user.model.js";
import { Course } from "../models/course.model.js";
import Category from "../models/categories.model.js";

export const createCourses = async (req, res) => {
  // steps we need to check
  // 1. input validation
  // 2. validate mongoDB ObjectIds for category and creator
  // 3. check category for existingCategory or existingCreator
  // Step 5: Check for Duplicate Course Title
  // Step 6: Create and Save the Course
  // Step 7: Success Response
  try {
    const { title, image, description, category, creator, price } = req.body;
    if (!title || !image || !description || !creator || !category || !price) {
      return res
        .status(400)
        .json({ success: false, message: "All fields  are required" });
    }

    if (!mongoose.isValidObjectId(creator)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Creator Id" });
    }

    if (!mongoose.isValidObjectId(category)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid CategroyId" });
    }

    const isCreatorExist = await User.findById(creator);

    if (!isCreatorExist) {
      return res
        .status(404)
        .json({ success: false, message: "Creator not Exist" });
    }

    const isCategoryExist = await Category.findById(category);

    if (!isCategoryExist) {
      return res
        .status(400)
        .json({ success: false, message: "Category not Exist" });
    }

    // check duplicate value

    const duplicateTitle = await Course.findOne({ title });

    if (duplicateTitle) {
      return res
        .status(400)
        .json({ success: false, message: "Title Alreday Exist" });
    }

    const newCourses = new Course({
      title,
      image,
      description,
      category,
      creator,
      price,
    });

    const savedCourse = await newCourses.save();

    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      course: savedCourse,
    });
  } catch (error) {
    console.log("Error in Create Routes controllers", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const updateCourseById = async (req, res) => {
  try {
  } catch (error) {}
};

export const deleteCourseById = async (req, res) => {
  try {
  } catch (error) {}
};

export const getAllCourses = async (req, res) => {
  try {
  } catch (error) {}
};

export const getCourseById = async (req, res) => {
  try {
  } catch (error) {}
};
