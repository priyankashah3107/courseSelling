import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndCookie } from "../utils/generateTokenAndSetCookie.js";
import { Course } from "../models/course.model.js";
import Purchase from "../models/purchase.model.js";

export const signup = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // cheking is email is valid or not
    if (!username || !email || !password || !role) {
      return res
        .status(400)
        .json({ success: false, message: "All the feild are required" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Email Type" });
    }

    const isUserExist = await User.findOne({ username });
    if (isUserExist) {
      return res
        .status(400)
        .json({ success: false, message: "Username is Already Exist" });
    }

    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      return res
        .status(400)
        .json({ success: false, message: "Email is Alreday Exist" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password should contain atLeast 6 character",
      });
    }
    // hash the password and generate the salt

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // cheking for the roles

    const validRoles = ["user", "admin"];
    if (!validRoles.includes(role)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Role Provided" });
    }

    const newUser = new User({
      username,
      email,
      password: hashPassword,
      role,
    });

    if (newUser) {
      generateTokenAndCookie(newUser._id, res);
      await newUser.save();

      return res.status(201).json({
        success: true,
        user: newUser,
      });
    }
  } catch (error) {
    console.log("Error in SignUp Contoller Routes", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All feilds are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const passwordCorrecct = await bcrypt.compare(password, user.password);

    if (!passwordCorrecct) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect Password" });
    }

    generateTokenAndCookie(user._id, res);

    return res
      .status(200)
      .json({ success: true, message: "Login Successfully" });
  } catch (error) {
    console.log("Error in Login Contoller Routes", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    return res
      .status(200)
      .json({ success: true, message: "Logged Successfully" });
  } catch (error) {
    console.log("Error in Logout Controller Routes", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getLoginUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not Found" });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in GetLoginRoute", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// Tasks

export const purchaseCourse = async (req, res) => {
  //  userID, courseId,  purchaseDate
  const { userID, courseId } = req.body;
  console.log("UserId from PurchaseCourse", userID);
  console.log("CourseId from PurchaseCourse", courseId);
  // userId is coming from the User Model and courseId is coming from course model

  // tasks1. Validate Input Data
  // tasks2. Check User and Course Existence:
  // tasks3. Check if Already Purchased
  // tasks4. Only authenticate user can purchase the course
  // tasks5. Create Purchase Record
  // tasks6. Return a Success Response
  // TODO: what about the payment logic

  try {
    if (!userID || !courseId) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const isUserIdExist = await User.findById(userID);
    if (!isUserIdExist) {
      return res
        .status(400)
        .json({ success: false, message: "UserId Not Exist" });
    }

    const isCourseIdExist = await Course.findById(courseId);
    if (!isCourseIdExist) {
      return res
        .status(400)
        .json({ success: false, message: "Course Id not Exist" });
    }

    // checking is already course purchased

    const isAlreadyCoursePurchased = await Purchase.findOne({
      userID,
      courseId,
    });

    if (isAlreadyCoursePurchased) {
      return res
        .status(403)
        .json({ success: false, message: "Course has already been purchased" });
    }

    // only authenticated user can purchase the course

    const authUser = req.user?.id;
    console.log("AuthUser Id from Purchased Course", authUser);
    if (!authUser || authUser !== userID) {
      return res.status(400).json({
        success: false,
        message: "You are not authenticated to purchase this course",
      });
    }

    const newPurchaseCourse = new Purchase({
      userID,
      courseId,
    });

    await newPurchaseCourse.save();

    return res
      .status(201)
      .json({ success: true, message: "Course Puchases successfully" });
  } catch (error) {
    console.log("Error in purchaseCourseRoutes Controllers", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getPurchaseCourse = async (req, res) => {
  try {
  } catch (error) {}
};
