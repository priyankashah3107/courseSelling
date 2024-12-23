// import jwt from "jsonwebtoken";
// import { env_Vars } from "../config/envVars.js";

// export const generateTokenAndCookie = async (userId, res) => {
//   const token = jwt.sign({ userId }, env_Vars.SECRET_TOKEN, {
//     expiresIn: "60d",
//   });

//   res.cookie("jwt", token, {
//     maxAge: 60 * 24 * 60 * 1000,
//     httpOnly: true,
//     sameSite: "strict",
//     secure: env_Vars.NODE_ENV !== "development",
//   });
// };

import jwt from "jsonwebtoken";
import { env_Vars } from "../config/envVars.js";
export function wrapperofGenrateTokenAndCookie(Secret_token) {
  return function generateTokenAndCookie(userId, res) {
    const token = jwt.sign({ userId }, Secret_token, {
      expiresIn: "60d",
    });

    res.cookie("jwt", token, {
      maxAge: 60 * 24 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: env_Vars.NODE_ENV !== "development",
    });
  };
}
