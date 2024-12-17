import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
      enum: [
        "Computer Science",
        "Web Development",
        "UI/UX",
        "Web Designing",
        "Web3",
        "Artificial Intelligence",
      ], // Predefined categories
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categoriesSchema);

export default Category;
