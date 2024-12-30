// import Admin from "../models/admin.models.js";
// import bcryptjs from "bcryptjs";
// export const signin = async (req, res) => {
//   // tasks
//   const { username, email, password, state, purchasedCourse } = req.body;
//   // this purchasecourse value validate from Purchased Schema
//   try {
//     if (!username || !email || !password || !state) {
//       return res
//         .status(400)
//         .json({ success: false, message: "All Feilds are required" });
//     }

//     const isAdminExist = await Admin.findOne({ username });
//     if (isAdminExist) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Username is Already Exist" });
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!emailRegex.test(email)) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid Email Address" });
//     }

//     if (password.length < 6) {
//       return res.status(400).json({
//         success: true,
//         message: "Password should atleast 6 character",
//       });
//     }

//     // hashing the password
//     const salt = await bcryptjs.genSalt(10);
//     const hashPassword = await bcryptjs.hash(password, salt);

//     const newAdmin = new Admin({
//       username,
//       password: hashPassword,
//       email,
//     });
//   } catch (error) {}
// };
// export const login = async (req, res) => {};
// export const logout = async (req, res) => {};
// export const isAdmin = async (req, res) => {};

import bcrypt from "bcryptjs";
import { wrapperofGenrateTokenAndCookie } from "../utils/generateTokenAndSetCookie.js";
import { env_Vars } from "../config/envVars.js";
import Admin from "../models/admin.models.js";

const generateAdminTokenAndCookie = wrapperofGenrateTokenAndCookie(
  env_Vars.ADMIN_SECRET_TOKEN
);

export const signup = async (req, res) => {
  try {
    const { username, email, password, state } = req.body;
    // console.log(req.body);

    if (!username || !email || !password || !state) {
      return res.status(400).json({
        success: false,
        message: "All the fields are required",
      });
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email Type",
      });
    }

    const existingUser = await Admin.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username or email already exist",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password should contain at least 6 characters",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({
      username,
      email,
      password: hashPassword,
      state,
    });

    await newAdmin.save();

    generateAdminTokenAndCookie(newAdmin._id, res);

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      admin: newAdmin,
    });
  } catch (error) {
    console.log("Error in SignUp Controller Routes", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
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

    const admin = await Admin.findOne({ email });
    // console.log("LoginAdmin ID", admin._id);
    if (!admin) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const passwordCorrecct = await bcrypt.compare(password, admin.password);

    if (!passwordCorrecct) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect Password" });
    }

    // generateTokenAndCookie(user._id, res);
    generateAdminTokenAndCookie(admin._id, res);

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
      .json({ success: true, message: "Logout Successfully" });
  } catch (error) {
    console.log("Error in Logout Controller Routes", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getAdminLoginUser = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select("-password");
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "User not Found" });
    }

    return res.status(200).json({ success: true, admin });
  } catch (error) {
    console.log("Error in GetLoginRoute", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
