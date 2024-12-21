import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    // state: {
    //   type: String,
    //   required: true, // for gst bills
    // },
    // phonenumber: {
    //   type: String, // making string because only string can not be handle special characters such as +91
    //   required: true,
    // },
    // one user can have multiple purchases

    purchasedCourses: [
      // many to many relationship between user and courses
      {
        type: mongoose.Types.ObjectId,
        ref: "Purchase",
      },
    ],

    // purchasedList: [
    //   {
    //     type: mongoose.Types.ObjectId,
    //     ref: "Course"
    //   }
    // ]
  },

  { timestamps: true }
);

const User = model("User", userSchema);
export default User;
