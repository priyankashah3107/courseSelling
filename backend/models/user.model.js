import mongoose, { model } from "mongoose";

const userSchema = mongoose.Schema(
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
    state: {
      type: String,
      required: true, // for gst bills
    },
    phonenumber: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);
export default User;
