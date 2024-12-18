import mongoose, { get } from "mongoose";
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

    const creatorData = req.user; // This value is coming from middleware which is protectRoute

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

// export const updateCourseById = async (req, res) => {
//   const { id } = req.params;
//   const { title, image, description, price, category } = req.body;
//   const userId = req.user._id;

//   try {
//     if (!title || !image || !description || !price || !category) {
//       return res
//         .status(400)
//         .json({ success: false, message: "All fields are required" });
//     }

//     const course = await Course.findById(id);
//     if (!course) {
//       return res.status(404).json({
//         success: false,
//         message: "Course not found",
//       });
//     }

//    // cheking course creator is belongs to the userID
//     if (course.creator.toString() !== userId.toString()) {
//       return res.status(403).json({
//         success: false,
//         message: "You are not authorized to update this course",
//       });
//     }

//     // Validate and fetch category if necessary
//     let categoryId = category;
//     if (!mongoose.Types.ObjectId.isValid(category)) {
//       const categoryData = await Category.findOne({ title: category });
//       if (!categoryData) {
//         return res.status(404).json({
//           success: false,
//           message: "Category not found. Please use a valid category title.",
//         });
//       }
//       categoryId = categoryData._id; // Assign the category ObjectId
//     }

//     // Update the course
//     const updatedCourse = await Course.findByIdAndUpdate(
//       id,
//       { title, image, description, price, category: categoryId },
//       { new: true, runValidators: true }
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Course updated successfully",
//       content: updatedCourse,
//     });
//   } catch (error) {
//     console.log("Error in updateCourseById controller:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };

export const updateCourseById = async (req, res) => {
  const { id } = req.params;
  const { title, image, description, price, category } = req.body;
  console.log("This is the Course Id", id);
  const userId = req.user._id;
  // tasks I want to update everything like: title, image, description, price, category
  // task2. Finding the course in the database
  // task3. checking Is this creator exist in course schema and check with the authentcated user
  // Validate and fetch category if necessary

  try {
    if (!title || !image || !description || !price || !category) {
      return res
        .status(400)
        .json({ success: true, message: "All feilds are required" });
    }

    const course = await Course.findById(id);

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not find by this Id" });
    }

    if (course.creator.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "you are not authorized user to make changes in this post",
      });
    }

    let categoryId = category;

    if (!mongoose.Types.ObjectId.isValid(category)) {
      const categoryData = await Category.findOne({ title: category });

      if (!categoryData) {
        return res.status(404).json({
          success: false,
          message: "Category not found please use a valid category title",
        });
      }

      categoryId = categoryData._id; // assing to the category objectid
    }

    const updateCourse = await Course.findByIdAndUpdate(
      id,
      { title, image, description, price, category: categoryId },
      { new: true, runValidators: true }
    );

    await updateCourse.save();
    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      userId,
      content: updateCourse,
    });
  } catch (error) {
    console.log("Error in updateCourseById controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
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

// I want to group all the course on the behalf of the creator
// high level mongodb give by gpt
// export const getAllCourses = async (req, res) => {
//   try {
//     const groupedCourses = await Course.aggregate([
//       {
//         $lookup: {
//           from: "users", // Reference the users collection
//           localField: "creator", // Field in Course schema
//           foreignField: "_id", // Field in User schema
//           as: "creatorDetails", // Alias for creator data
//         },
//       },
//       {
//         $unwind: "$creatorDetails", // Flatten the creatorDetails array
//       },
//       {
//         $group: {
//           _id: "$creator", // Group by creator ID
//           creator: { $first: "$creatorDetails" }, // Include creator's details
//           courses: { $push: "$$ROOT" }, // Add all courses created by this user
//         },
//       },
//       {
//         $project: {
//           _id: 0, // Exclude the default MongoDB _id field
//           creator: {
//             id: "$creator._id",
//             name: "$creator.name",
//             email: "$creator.email",
//           },
//           courses: {
//             title: 1,
//             image: 1,
//             description: 1,
//             price: 1,
//             category: 1,
//             createdAt: 1,
//             updatedAt: 1,
//           },
//         },
//       },
//     ]);

//     return res.status(200).json({ success: true, content: groupedCourses });
//   } catch (error) {
//     console.error("Error in getCoursesGroupedByCreator:", error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Internal Server Error" });
//   }
// };

// export const getCourseById = async (req, res) => {
//   const { id } = req.params;
//   console.log(id);
//   try {
//     const getParticulatCourseId = await Course.findById(id);
//     return res
//       .status(200)
//       .json({ success: true, content: getParticulatCourseId });
//   } catch (error) {
//     console.log("Error in getCourseById ", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };

export const getCourseById = async (id) => {
  try {
    const getParticularCourseId = await Course.findById(id);
    console.log("ParticularCourseId of the User", getParticularCourseId);
    if (!getParticularCourseId) {
      throw new Error("Unable to find the Id");
    }
    return getParticularCourseId;
  } catch (error) {
    console.log("Error in GetCourseById", error);
  }
};
