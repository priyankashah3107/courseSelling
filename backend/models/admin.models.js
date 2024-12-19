import mongoose, { model } from "mongoose";

const adminSchema = mongoose.Schema(
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
      unique: true,
      required: true,
    },
    state: {
      type: String,
      required: true, // for gst bills
    },
  },
  { timestamps: true }
);

const Admin = model("Admin", adminSchema);
export default User;
