import jwt from "jsonwebtoken";
import { env_Vars } from "../config/envVars.js";
import User from "../models/user.model.js";
import Admin from "../models/admin.models.js";
// this file is change by kirat
// export const protectRoute = async (req, res, next) => {
//   try {
//     // retrive the token from the cookie

//     const token = req.cookies["jwt"];
//     console.log("Token received:", token);
//     if (!token) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Authentication token missing" });
//     }
//     // decode the tokenQ

//     let decode = jwt.verify(token, env_Vars.USER_SECRET_TOKEN);

//     const user = await User.findById(decode.userId).select("-password");
//     console.log("Fetched User", user);
//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User Not Found" });
//     }
//     req.user = user;
//     console.log("User info from Protected Route", user);
//     next();
//   } catch (error) {
//     console.log("Error in ProtectRoute", error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Internal Server Errorr" });
//   }
// };

export function protectRoute_SECRET_TOKEN(Secret_Token) {
  return async function protectRoute(req, res, next) {
    try {
      // retrive the token from the cookie

      const token = req.cookies["jwt"];
      console.log("Token received:", token);
      if (!token) {
        return res
          .status(401)
          .json({ success: false, message: "Authentication token missing" });
      }
      // decode the tokenQ

      let decode = jwt.verify(token, Secret_Token);

      const user =
        (await User.findById(decode.userId).select("-password")) ||
        (await Admin.findById(decode.userId).select("-password"));
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
      console.log("Error in ProtectRoute", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Errorr" });
    }
  };
}

// import jwt from "jsonwebtoken";
// import { env_Vars } from "../config/envVars.js";
// import User from "../models/user.model.js";
// // this file is change by kirat
// export const protectRoute = async (req, res, next) => {
//   try {
//     // retrive the token from the cookie
//     const token = req.cookies["jwt"];
//     if (!token) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Authentication token missing" });
//     }
//     // decode the token
//     let decode = jwt.verify(token, env_Vars.SECRET_TOKEN);
//     req.user = await User.findById(decode.userId).select("-password");
//     if (!req.user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User Not Found" });
//     }
//     // req.user = user;
//     next();
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ success: false, message: "Internal Server Errorr" });
//   }
// };
