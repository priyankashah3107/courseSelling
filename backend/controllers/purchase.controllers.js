import { Course } from "../models/course.model.js";
import Purchase from "../models/purchase.model.js";
import User from "../models/user.model.js";

// this is only user can see dashboard
export const getPurchasedCourseUserById = async (req, res) => {
  const { userID, courseId } = req.params;

  const authenticatedUser = req.user.id;
  console.log("USERID coming from getPurchasedCourseUserById", userID);
  console.log("CourseID coming from getPurchasedCourseUserById", courseId);
  try {
    if (!userID || !courseId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Course ID are required",
      });
    }

    if (authenticatedUser !== userID) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to access this data",
      });
    }

    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Look for the purchase record for the authenticated user and courseId
    const purchaseRecord = await Purchase.findOne({
      userID: userID,
      courseId: courseId,
    });

    if (!purchaseRecord) {
      return res.status(404).json({
        success: false,
        message: "No purchase record found for this course",
        purchasedCourse: purchaseRecord,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully fetched purchased course data",
      data: purchaseRecord,
    });
  } catch (error) {
    console.error("Error in getPurchasedCourseUserById:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const purchaseCourses = async (req, res) => {
  // validate the userID and courseId
  // checkUserId and courseId exist in database
  // only authenticated user can purchase the course
  // check is course already exists in the db duplicate check
  // purchase the course
  // save the purchase the in the db
  // success return

  // take userId from the protect route
  // this will create a problem

  const { userID, courseId } = req.body;

  try {
    if (!userID || !courseId) {
      return res
        .status(400)
        .json({ success: false, message: "All feilds are required" });
    }
    // const isUserIdExist = await User.findById(userID);
    // if (!isUserIdExist) {
    //   return res
    //     .status(404)
    //     .json({ success: false, message: "UserId not found" });
    // }
    const isCourseIdExist = await Course.findById(courseId);

    if (!isCourseIdExist) {
      return res
        .status(404)
        .json({ success: false, message: "Course ID not found" });
    }

    // check for duplicate purchase

    const isAlreadyCoursePurchase = await Purchase.findOne({
      userID,
      courseId,
    });

    if (isAlreadyCoursePurchase) {
      return res.status(400).json({
        success: false,
        message: "You have already purchased this course",
      });
    }

    // checking is user is autenticated to purchase the course

    // if (!req.user?.id || req.user?.id.toString() !== userID.toString()) {
    //   // not authenticated or not authorized
    //   return res.status(400).json({
    //     success: false,
    //     message: "Your are not authenticated user to purchase the course",
    //   });
    // }

    const newPurchase = new Purchase({
      userID,
      courseId,
    });

    await newPurchase.save();

    return res.status(200).json({
      success: true,
      message: "course purchase successfully",
      myPurchases: newPurchase,
    });
  } catch (error) {
    console.error("Error in getPurchasedCourseUserById:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// export const getPurchasedCoursebyUserId = async (req, res) => {
//   // one user can purchase multiple course get purchaseCourse by UserId show this detail to the particular user
//   // only authenticated user can see their purchased course

//   // TODO: use  middleware
//   const { userID } = req.params;
//   console.log("UserID is coming from getPurchasedCoursebyUserId", userID);
//   try {
//     if (!userID) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid User Id passed in params" });
//     }

//     const isUserIdExist = await User.findById(userID);

//     if (!isUserIdExist) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid not found" });
//     }

//     // if (!req.user?.id || userID !== req.user?.id) {
//     //   // not authenticated and not authorized user
//     //   return res.status(403).json({
//     //     success: false,
//     //     message: "You are not authorized to access this data",
//     //   });
//     // }

//     // purchase by the user
//     const purchases = await Purchase.find({ userID })
//       .populate("courseId", "title description image price" )
//       .exec();

//     if (!purchases || !purchases.length === 0) {
//       return res
//         .status(404)
//         .json({ success: false, message: "No purchases found" });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Successfully fetech the data from UserID",
//       purchasedCourses: purchases,
//     });
//   } catch (error) {
//     console.error("Error in getPurchasedCoursebyUserId:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };





export const getPurchasedCoursebyUserId = async (req, res) => {
  try {
    const userId = req?.user?._id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "UNAUTHORIZED USER" });
    }

    // Fetch purchases directly from the Purchase model
    const userPurchasedList = await Purchase.find({ userID: userId })
      .populate({
        path: "courseId", // Populate the course details
        select: "title price description image", // Only select required fields
      })
      .exec();

    if (!userPurchasedList || userPurchasedList.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No purchased courses found for this user.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Purchased courses retrieved successfully.",
      userPurchasedList, // Return the list of purchases
    });
  } catch (error) {
    console.error("Error retrieving purchased courses:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while retrieving purchased courses.",
    });
  }
};






















































export const getPurchasedCoursebyCourseId = async (req, res) => {
  const { courseId } = req.params;
  console.log("CourseId from getPurchasedCoursebyCourseId endpoint", courseId);
  // tasks: check course id is valid
  // check entry in db
  // only authenticated users are holding the purchased courses in purchases
  // this is for admin if admin want to see one course i having how many users
  try {
    if (!courseId) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid CourseId Parms" });
    }
    const isCourseIdExist = await Course.findById(courseId);

    if (!isCourseIdExist) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Course Id" });
    }

    if (!req.user?.id) {
      return res
        .status(400)
        .json({ success: false, message: "Unauthenticated user" });
    }

    const course = await Purchase.find({ courseId })
      .populate("userID", "username email")
      .exec();

    if (!course) {
      return res
        .status(400)
        .json({ success: false, message: "Course not exist" });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully fetched the courses for many users",
      purchasedUsers: course,
    });
  } catch (error) {
    console.error("Error in  getPurchasedCoursebyCourseId:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// one courseId have multiple user
