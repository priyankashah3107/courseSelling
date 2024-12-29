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
      const token = req.cookies["jwt"];
      console.log("Token received:", token);
      if (!token) {
        return res
          .status(401)
          .json({ success: false, message: "Authentication token missing" });
      }
      // decode the tokenQ

      let decode = jwt.verify(token, Secret_Token);
      console.log("Decode", decode)
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

// export function protectRoute_SECRET_TOKEN(Secret_Token) {
//   return async function protectRoute(req, res, next) {
//     try {
//       // Retrieve the token from the cookies
//       const token = req.cookies?.jwt;
//       if (!token) {
//         return res
//           .status(401)
//           .json({ success: false, message: "Authentication token missing" });
//       }

//       // Decode the token
//       let decode;
//       try {
//         decode = jwt.verify(token, Secret_Token);
//       } catch (err) {
//         return res
//           .status(403)
//           .json({ success: false, message: "Invalid or expired token" });
//       }

//       // Find the user or admin based on the decoded token
//       let user = await User.findById(decode.userId).select("-password");
//       let admin = null;

//       if (!user) {
//         admin = await Admin.findById(decode.userId).select("-password");
//       }

//       if (!user && !admin) {
//         return res
//           .status(404)
//           .json({ success: false, message: "User or Admin not found" });
//       }

//       // Attach the authenticated entity to the request object
//       req.user = user || admin;
//       console.log("Authenticated entity:", req.user);
//       next();
//     } catch (error) {
//       console.error("Error in ProtectRoute:", error);
//       return res
//         .status(500)
//         .json({ success: false, message: "Internal Server Error" });
//     }
//   };
// }
