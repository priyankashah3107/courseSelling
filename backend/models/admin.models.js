import mongoose, { model } from "mongoose";
// admin is having a access to see who can purchased their course

// many user can have many course
// many course have manu user
// many to many relationship this will take the refrece from the purchase routes
// null
// false
// 0
// NaN
// An empty string ("")
const adminSchema = new mongoose.Schema(
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
    // role: {
    //   type: String,
    //   unique: true,
    //   required: true,
    // },

    // this 
    purchasedCourse: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Purchase",
      },
    ],
    state: {
      type: String,
      required: true, // for gst bills
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
