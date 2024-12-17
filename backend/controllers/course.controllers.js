import mongoose from "mongoose";
import User from "../models/user.model.js";
import { Course } from "../models/course.model.js";
import Category from "../models/categories.model.js";
// finding solution for creator and category category problem solve ,
// finding creator solution
export const createCourses = async (req, res) => {
  try {
    const { title, image, description, price, category } = req.body;
    if (!title || !image || !description || !price) {
      return res
        .status(400)
        .json({ success: false, message: "All Feilds are Required" });
    }

    // cheking is title is already exist

    const isTitleExist = await Course.findOne({ title });

    if (isTitleExist) {
      return res
        .status(400)
        .json({ success: false, message: "Title Already Exist" });
    }

    const categoryData = await Category.findOne({ title: category });

    if (!categoryData) {
      return res.status(404).json({
        success: false,
        message: "Category not found. Please use a valid category title.",
      });
    }

    const creatorData = req.user;

    if (!creatorData) {
      return res
        .status(400)
        .json({ success: false, json: "Unable to find the Creator" });
    }

    if (price <= 0 || price >= 5000) {
      return res
        .status(400)
        .json({ message: "Price should be greater than 0 and less 5000" });
    }

    if (description.length === 10) {
      return res.status(400).json({
        success: false,
        message: "Description length must be at least 10 characters",
      });
    }

    const newCourse = new Course({
      title,
      image,
      description,
      price,
      category: categoryData._id,
      creator: creatorData._id,
    });

    await newCourse.save();

    return res.status(201).json({
      success: true,
      message: "Courses Created Successfully",
      course: newCourse,
    });
  } catch (error) {
    console.log("Error in Create Routes controllers", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const updateCourseById = async (req, res) => {
  const { id } = req.params;

  try {
  } catch (error) {}
};

export const deleteCourseById = async (req, res) => {
  try {
  } catch (error) {}
};

export const getAllCourses = async (req, res) => {
  try {
    const getcourses = await Course.find();
    return res.status(200).json({ success: true, content: getcourses });
  } catch (error) {
    console.log("Error in  getAllCourses Routes controllers", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getCourseById = async (req, res) => {
  try {
  } catch (error) {}
};
