import { Router } from "express";
import { createViewDetail, deleteTheViewDetail, getViewDetail, updateTheViewDetail } from "../controllers/buydetails.controllers.js";

const router = Router()

router.post("/create", createViewDetail);
router.patch("/update", updateTheViewDetail)
router.delete("/delete", deleteTheViewDetail)
router.get("/viewdetails", getViewDetail)


export default router

// admin can create the the buydeatails for the particualr courseId 
// admin can update the buyDetails from the particular courseId 
// admin can delete the buyDetails from the particular couseId 
// user can fetch the buyDetails from the particular courseId 
