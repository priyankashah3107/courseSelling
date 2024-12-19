import jwt from "jsonwebtoken";
import { env_Vars } from "../config/envVars.js";
import User from "../models/user.model.js";
// this file is change by kirat
export const protectRoute = async (req, res, next) => {
  try {
    // retrive the token from the cookie

    const token = req.cookies["jwt"];
    console.log("Token received:", token);
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication token missing" });
    }
    // decode the token
    try {
      let decode = jwt.verify(token, env_Vars.SECRET_TOKEN);

      const user = await User.findById(decode.userId).select("-password");
      console.log("Fetched User", user);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User Not Found" });
      }
      req.user = user;
      console.log("User info from Protected Route", user);
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ success: false, message: "Expire Token or Invalid Token" });
    }
  } catch (error) {
    console.log("Error in ProtectRoute", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Errorr" });
  }
};
