import { Router } from "express";
import {
  getPurchasedCoursebyCourseId,
  getPurchasedCoursebyUserId,
  getPurchasedCourseUserById,
} from "../controllers/purchase.controllers.js";
import { purchaseCourse } from "../controllers/user.controllers.js";

const router = Router();

router.get("/getpurchased/:userID/:courseId", getPurchasedCourseUserById);
router.post("/purchasecourses", purchaseCourse);
// router.get("/purchasedcourses/:userID", getPurchasedCoursebyUserId); 
router.get("/purchasedcourses", getPurchasedCoursebyUserId); // one user can have many courses
router.get("/purchasedcourseId/:courseId", getPurchasedCoursebyCourseId); // one course have many user
// how can i know a particular user purchase how many course
// how can i a known particualar course purchase by how many userID
//
// router.get("/getallpurchased/:userID/:courseId", getAllPurchaseCourse)

export default router;
