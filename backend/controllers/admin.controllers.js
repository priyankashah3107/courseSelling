import Admin from "../models/admin.models.js";
import bcryptjs from "bcryptjs";
export const signin = async (req, res) => {
  // tasks
  const { username, email, password, state, purchasedCourse } = req.body;
  // this purchasecourse value validate from Purchased Schema
  try {
    if (!username || !email || !password || !state) {
      return res
        .status(400)
        .json({ success: false, message: "All Feilds are required" });
    }

    const isAdminExist = await Admin.findOne({ username });
    if (isAdminExist) {
      return res
        .status(400)
        .json({ success: false, message: "Username is Already Exist" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Email Address" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: true,
        message: "Password should atleast 6 character",
      });
    }

    // hashing the password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const newAdmin = new Admin({
      username,
      password: hashPassword,
      email,
    });
  } catch (error) {}
};
export const login = async (req, res) => {};
export const logout = async (req, res) => {};
export const isAdmin = async (req, res) => {};
