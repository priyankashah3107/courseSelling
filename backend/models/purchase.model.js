import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },

  courseId: {
    type: mongoose.Types.ObjectId,
    ref: "Course",
    required: true,
  },

  
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
});

const Purchase = mongoose.model("Purchase", purchaseSchema);

export default Purchase;
