import mongoose, { get } from "mongoose";
import User from "../models/user.model.js";
import { Course } from "../models/course.model.js";
import Category from "../models/categories.model.js";
import Purchase from "../models/purchase.model.js";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { env_Vars } from "../config/envVars.js";
// finding solution for creator and category category problem solve ,
// finding creator solution
// only admin is own this endpoints
// export const createCourses = async (req, res) => {
//   try {
//     const { title, image, description, price, category } = req.body;
//     if (!title || !image || !description || !price) {
//       return res
//         .status(400)
//         .json({ success: false, message: "All Feilds are Required" });
//     }

//     // cheking is title is already exist

//     const isTitleExist = await Course.findOne({ title });

//     if (isTitleExist) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Title Already Exist" });
//     }

//     const categoryData = await Category.findOne({ title: category });

//     if (!categoryData) {
//       return res.status(404).json({
//         success: false,
//         message: "Category not found. Please use a valid category title.",
//       });
//     }

//     // creator of the course
//     const creatorData = req.user; // This value is coming from middleware which is protectRoute
//     console.log("CreatorData from CreateCourses", creatorData.username);
//     if (!creatorData) {
//       return res
//         .status(400)
//         .json({ success: false, json: "Unable to find the Creator" });
//     }

//     if (price <= 0 || price >= 5000) {
//       return res
//         .status(400)
//         .json({ message: "Price should be greater than 0 and less 5000" });
//     }

//     if (description.length === 10) {
//       return res.status(400).json({
//         success: false,
//         message: "Description length must be at least 10 characters",
//       });
//     }

//     const newCourse = new Course({
//       title,
//       image,
//       description,
//       price,
//       category: categoryData._id,
//       creator: creatorData._id,
//       // username: creatorData.username, // unable to get username
//     });

//     await newCourse.save();

//     return res.status(201).json({
//       success: true,
//       message: "Courses Created Successfully",
//       course: newCourse,
//     });
//   } catch (error) {
//     console.log("Error in Create Routes controllers", error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Internal Server Error" });
//   }
// };

// s3 upload

// const s3Client = new S3Client({
//   region: "ap-south-1",
//   credentials: {
//     accessKeyId: env_Vars.ACCESSKEYID,
//     secretAccessKey: env_Vars.SECRETACCESSKEY,
//   },
// });

// export const createCourses = async (req, res) => {
//   try {
//     const { fileName, fileType } = req.body;

//     console.log("FileName", fileName);
//     console.log("FileType", fileType);

//     if (!fileName || !fileType) {
//       return res.status(400).json({ message: "File details are required" });
//     }

//     // Sanitize the filename and ensure unique names
//     const sanitizedFileName = encodeURIComponent(fileName);
//     const uniqueKey = `upload/course/${Date.now()}-${sanitizedFileName}`;

//     const command = new PutObjectCommand({
//       Bucket: "imgprivate", // Your bucket name
//       Key: uniqueKey,
//       ContentType: fileType,
//     });

//     console.log("command", command);
//     const presignedUrl = await getSignedUrl(s3Client, command, {
//       expiresIn: 3600,
//     });

//     console.log("presignedUrl", presignedUrl);
//     res.status(200).json({
//       presignedUrl,
//       fileKey: uniqueKey,
//     });
//   } catch (error) {
//     console.error("Error generating presigned URL:", error);
//     res.status(500).json({
//       message: "Failed to generate presigned URL",
//       error: error.message,
//     });
//   }
// };

// jhgj

// export const createCourses = async (req, res) => {
//   try {
//     const { title, image, description, price, category } = req.body;
//     if (!title || !image || !description || !price) {
//       return res
//         .status(400)
//         .json({ success: false, message: "All Feilds are Required" });
//     }

//     // cheking is title is already exist

//     const isTitleExist = await Course.findOne({ title });

//     if (isTitleExist) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Title Already Exist" });
//     }

//     const categoryData = await Category.findOne({ title: category });

//     if (!categoryData) {
//       return res.status(404).json({
//         success: false,
//         message: "Category not found. Please use a valid category title.",
//       });
//     }

//     const purchased = await Purchase.find();

//     if (!purchased) {
//       return res.status(404).json({
//         success: false,
//         message: "Unable to find the Purchases Course",
//       });
//     }

//     // creator of the course
//     const creatorData = req.user; // This value is coming from middleware which is protectRoute
//     console.log("CReated Daata", req.user);
//     console.log("CreatorData from CreateCourses", creatorData.username);
//     if (!creatorData) {
//       return res
//         .status(400)
//         .json({ success: false, json: "Unable to find the Creator" });
//     }

//     if (price <= 0 || price >= 5000) {
//       return res
//         .status(400)
//         .json({ message: "Price should be greater than 0 and less 5000" });
//     }

//     if (description.length === 10) {
//       return res.status(400).json({
//         success: false,
//         message: "Description length must be at least 10 characters",
//       });
//     }

//     const newCourse = new Course({
//       title,
//       image,
//       description,
//       price,
//       category: categoryData._id,
//       creator: creatorData._id,
//       purchasedList: purchased,
//       // username: creatorData.username, // unable to get username
//     });

//     await newCourse.save();

//     return res.status(201).json({
//       success: true,
//       message: "Courses Created Successfully",
//       course: newCourse,
//     });
//   } catch (error) {
//     console.log("Error in Create Routes controllers", error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Internal Server Error" });
//   }
// };

// written by me
// export const updateCourseById = async (req, res) => {
//   const { id } = req.params;
//   const { title, image, description, price, category } = req.body;
//   console.log("This is the Course Id", id);
//   const userId = req.user._id;
//   // tasks I want to update everything like: title, image, description, price, category
//   // task2. Finding the course in the database
//   // task3. checking Is this creator exist in course schema and check with the authentcated user
//   // Validate and fetch category if necessary

//   try {
//     if (!title || !image || !description || !price || !category) {
//       return res
//         .status(400)
//         .json({ success: true, message: "All feilds are required" });
//     }

//     let categoryId = category;

//     if (!mongoose.Types.ObjectId.isValid(category)) {
//       const categoryData = await Category.findOne({ title: category });

//       if (!categoryData) {
//         return res.status(404).json({
//           success: false,
//           message: "Category not found please use a valid category title",
//         });
//       }

//       categoryId = categoryData._id; // assing to the category objectid
//     }
//     console.log("CategoryId", categoryId);
//     const updateCourse = await Course.findOneAndUpdate(
//       { _id: id, creator: { _id: req.user.id } },   // only autheticated admin can update the course. particular course belongs to that owner
//       // req.user._id,
//       { title, image, description, price, category: categoryId },
//       { new: true, runValidators: true }
//     );

//     console.log("UpdatedCourse", updateCourse);
//     // await updateCourse.save();
//     if (!updateCourse) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid course" });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Course updated successfully",
//       userId,
//       content: updateCourse,
//     });
//   } catch (error) {
//     console.log("Error in updateCourseById controller:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };

// gpt
export const updateCourseById = async (req, res) => {
  const { id } = req.params;
  const { title, image, description, price, category } = req.body;
  console.log("This is the Course Id", id);

  // const userId = req.user._id;

  try {
    // Find the course first to validate ownership and existence
    const course = await Course.findOne({ _id: id, creator: req.user._id });
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found or you do not have permission to update it",
      });
    }

    // Create an object with only the fields to be updated
    const updateFields = {};
    if (title) updateFields.title = title;
    if (image) updateFields.image = image;
    if (description) updateFields.description = description;
    if (price) updateFields.price = price;

    if (category) {
      // Validate and fetch category if necessary
      if (!mongoose.Types.ObjectId.isValid(category)) {
        const categoryData = await Category.findOne({ title: category });
        if (!categoryData) {
          return res.status(404).json({
            success: false,
            message: "Category not found. Please use a valid category title",
          });
        }
        updateFields.category = categoryData._id;
      } else {
        updateFields.category = category;
      }
    }

    console.log("Fields to update:", updateFields);

    // Perform the update
    const updatedCourse = await Course.findOneAndUpdate(
      { _id: id, creator: req.user._id },
      { $set: updateFields }, // Use $set to apply partial updates
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      return res
        .status(400)
        .json({ success: false, message: "Course update failed" });
    }

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      content: updatedCourse,
    });
  } catch (error) {
    console.log("Error in updateCourseById controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
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

//     // cheking course creator is belongs to the userID
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

export const deleteCourseById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id; // Ensure this comes from authentication middleware

  console.log("Id for deleting the course:", id);
  console.log("UserId in DeleteCourseById", userId);
  try {
    // Validate course ID

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: true, message: "Invalid Course Id" });
    }
    // // Find the course by ID
    // const course = await Course.findById(id);
    // Deleting data without validating the ID first is a waste of resources.
    // Using database calls to check invalid or malformed IDs increases unnecessary load on the database.
    // Example: The check below will fail if 'course' is null, leading to runtime errors.
    // Avoid accessing 'course._id' directly when 'course' might be null. that's why above approch is best
    // if (!course._id) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Invalid Course id" });
    // }

    // if (!course) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Course not found. Please provide a valid course ID.",
    //   });
    // }

    // if (course.creator.toString() !== userId.toString()) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "You are not authorized to delete this course.",
    //   });
    // }

    const deletedCourse = await Course.findByIdAndDelete({
      _id: id,
      creator: { _id: req.user.id },
    });

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully.",
      content: deletedCourse,
    });
  } catch (error) {
    console.log("Error in deleteCourseById controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
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

export const getCourseById = async (req, res) => {
  // task:
  const { id } = req.params;
  console.log(id);
  try {
    const getParticulatCourseId = await Course.findById(id);
    return res
      .status(200)
      .json({ success: true, content: getParticulatCourseId });
  } catch (error) {
    console.log("Error in getCourseById ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// making normal function for courseId call because this will use in many places
// export const getCourseById = async (id) => {
//   try {
//     const getParticularCourseId = await Course.findById(id);
//     console.log("ParticularCourseId of the User", getParticularCourseId);
//     if (!getParticularCourseId) {
//       throw new Error("Unable to find the Id");
//     }
//     return getParticularCourseId;
//   } catch (error) {
//     console.log("Error in GetCourseById", error);
//   }
// };

export const getCoursesByUserId = async (req, res) => {
  try {
    // Fetch all courses that are created by the authenticated user (req.user._id)
    const createdCourses = await Course.find({ creator: req.user._id });

    if (!createdCourses || createdCourses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No courses found or you are not the authenticated user",
      });
    }

    // Return the list of created courses
    return res.status(200).json({
      success: true,
      content: createdCourses,
    });
  } catch (error) {
    console.log("Error in getCoursesByUserId:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const createCourses = async (req, res) => {
  try {
    const { title, thumbnail, description, price, category } = req.body;
    console.log("Body", req.body);
    // Validate required fields
    if (!title || !description || !price || !category) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Check if the title already exists
    const isTitleExist = await Course.findOne({ title });
    if (isTitleExist) {
      return res
        .status(400)
        .json({ success: false, message: "Title already exists" });
    }

    // Validate the category
    const categoryData = await Category.findOne({ title: category });
    if (!categoryData) {
      return res.status(404).json({
        success: false,
        message: "Category not found. Please use a valid category title.",
      });
    }

    // Fetch purchased courses
    const purchased = await Purchase.find();
    if (!purchased) {
      return res.status(404).json({
        success: false,
        message: "Unable to find the purchased courses",
      });
    }

    // Validate the creator of the course
    const creatorData = req.user; // Assuming `req.user` is populated by middleware
    if (!creatorData) {
      return res
        .status(400)
        .json({ success: false, message: "Unable to find the creator" });
    }

    // Validate price
    if (price <= 0 || price >= 5000) {
      return res.status(400).json({
        success: false,
        message: "Price should be greater than 0 and less than 5000",
      });
    }

    // Validate description length
    if (description.length < 10) {
      return res.status(400).json({
        success: false,
        message: "Description length must be at least 10 characters",
      });
    }

    // Create a new course
    const newCourse = new Course({
      title,
      image: thumbnail || undefined,
      description,
      price,
      category: categoryData._id,
      creator: creatorData._id,
      purchasedList: purchased,
    });

    await newCourse.save();

    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      course: newCourse,
    });
  } catch (error) {
    console.error("Error in createCourses controller:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
