import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    image: {
      type: String,
      // unique: true,
      required: true,
    },
    description: {
      type: String,

      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },

    creator: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // intially ref is User yaha creator admin hoga
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    // one course can purchased by multipleUser
    // purchasedUser: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //   },
    // ],

    purchasedList: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Purchase", // Reference to the Purchase collection
      },
    ],
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);
