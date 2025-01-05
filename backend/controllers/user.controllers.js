import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { wrapperofGenrateTokenAndCookie } from "../utils/generateTokenAndSetCookie.js";
import { Course } from "../models/course.model.js";
import Purchase from "../models/purchase.model.js";
import { CreateRazorpayInstance, env_Vars } from "../config/envVars.js";
import Razorpay from "razorpay"

const generateUserTokenAndCookie = wrapperofGenrateTokenAndCookie(
  env_Vars.USER_SECRET_TOKEN
);


let razorpayInstance = new Razorpay({
  key_id:env_Vars.VITE_RAZORPAY_KEY_ID,
  key_secret:env_Vars.RAZORPAY_KEY_SECRET,
})

// when i click on the button then it accept price and the courseId
export const purchaseOrder = async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user._id;

  try {
    // Fetch the course by its ID
    const course = await Course.findById(courseId);

    // If the course does not exist
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    const price = course.price;

    // Check if the course has already been purchased
    const isCourseAlreadyPurchased = await Purchase.findOne({ userID: userId, courseId });

    if (isCourseAlreadyPurchased) {
      return res.status(409).json({ success: false, message: "You have already purchased this course" });
    }

    // Create a new purchase record (with 'Pending' status)
    const newPurchase = new Purchase({
      userID: userId,
      courseId,
      price,
      status: "Pending",
    });

    // Save the new purchase record
    await newPurchase.save();

    const amount = price * 100; // Convert price to paise (Razorpay expects this)

    // Create a Razorpay order
    const order = await razorpayInstance.orders.create({
      amount, // Amount in paise
      currency: "INR",
      receipt: `order_rcptid_${newPurchase._id}`, // Unique receipt ID
      payment_capture: 1, // Auto-capture payment
    });

    // Check if the order creation was successful
    if (!order || !order.id) {
      return res.status(500).json({ success: false, message: "Error creating Razorpay order" });
    }

    // Update the new purchase record with the Razorpay order ID
    newPurchase.orderId = order.id;

    // Save the updated purchase record with the orderId (Single save operation)
    await newPurchase.save();

    // Send the order details back to the frontend to proceed with the payment
    return res.status(200).json({
      success: true,
      message: "Order created successfully",
      orderId: order.id, // Send the Razorpay order ID to frontend
      amount,
      course: {
        name: course.name,
        price: course.price,
        _id: course._id,
      }, // Send necessary course info to frontend
    });

  } catch (error) {
    console.log("Error in purchaseOrder Controller Routes", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



export const signup = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // cheking is email is valid or not
    if (!username || !email || !password || !role) {
      return res
        .status(400)
        .json({ success: false, message: "All the feild are required" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Email Type" });
    }

    // const isUserExist = await User.findOne({ username });
    // if (isUserExist) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Username is Already Exist" });
    // }

    // const isEmailExist = await User.findOne({ email });
    // if (isEmailExist) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Email is Alreday Exist" });
    // }

    // if ((await User.findOne({ username })) || (await User.findOne({ email }))) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Username or Email Already Exist" });
    // }

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "username or email already exist" });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password should contain atLeast 6 character",
      });
    }
    // hash the password and generate the salt

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // cheking for the roles

    const validRoles = ["user", "admin"];
    if (!validRoles.includes(role)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Role Provided" });
    }

    const newUser = new User({
      username,
      email,
      password: hashPassword,
      role,
    });

    await newUser.save();

    generateUserTokenAndCookie(newUser._id, res);

    return res.status(200).json({
      success: true,
      essage: "User created successfully",
      user: newUser,
    });

    // if (newUser) {
    //   // generateTokenAndCookie(newUser._id, res);
    //   generateUserTokenAndCookie(newUser._id, res);

    //   await newUser.save();

    //   return res.status(201).json({
    //     success: true,
    //     user: newUser,
    //   });
    // }
  } catch (error) {
    console.log("Error in SignUp Contoller Routes", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
   
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All feilds are required" });
    }

    const user = await User.findOne({ email });
    // const purchasedCourse = await Purchase.findOne({userID: user._id})
    // const purchasedCourse = await Purchase.findOne({userID: user.userID})

  //  if(!purchasedCourse) {
  //   return res.status(404).json({success: false, message: "No Course Found"})
  //  }

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const passwordCorrecct = await bcrypt.compare(password, user.password);

    if (!passwordCorrecct) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect Password" });
    }

    // generateTokenAndCookie(user._id, res);
    generateUserTokenAndCookie(user._id, res);

    return res
      .status(200)
      .json({ success: true, message: "Login Successfully"});
  } catch (error) {
    console.log("Error in Login Contoller Routes", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    return res
      .status(200)
      .json({ success: true, message: "Logged Successfully" });
  } catch (error) {
    console.log("Error in Logout Controller Routes", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getLoginUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    console.log("getLogiUser", user);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not Found" });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in GetLoginRoute", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// Tasks

// export const purchaseCourse = async (req, res) => {
//   //  userID, courseId,  purchaseDate

//   // take userid from the middleware
//   const { userID, courseId } = req.body;
//   console.log("UserId from PurchaseCourse", userID);
//   console.log("CourseId from PurchaseCourse", courseId);
//   // userId is coming from the User Model and courseId is coming from course model

//   // tasks1. Validate Input Data
//   // tasks2. Check User and Course Existence:
//   // tasks3. Check if Already Purchased
//   // tasks4. Only authenticate user can purchase the course
//   // tasks5. Create Purchase Record
//   // tasks6. Return a Success Response
//   // TODO: what about the payment logic

//   try {
//     if (!userID || !courseId) {
//       return res
//         .status(400)
//         .json({ success: false, message: "All fields are required" });
//     }

//     const isUserIdExist = await User.findById(userID);
//     if (!isUserIdExist) {
//       return res
//         .status(400)
//         .json({ success: false, message: "UserId Not Exist" });
//     }

//     const isCourseIdExist = await Course.findById(courseId);
//     if (!isCourseIdExist) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Course Id not Exist" });
//     }

//     // checking is already course purchased

//     const isAlreadyCoursePurchased = await Purchase.findOne({
//       userID,
//       courseId,
//     });

//     if (isAlreadyCoursePurchased) {
//       return res
//         .status(403)
//         .json({ success: false, message: "Course has already been purchased" });
//     }

//     // only authenticated user can purchase the course

//     const authUser = req.user?.id;
//     console.log("AuthUser Id from Purchased Course", authUser);
//     if (!authUser || authUser !== userID) {
//       return res.status(400).json({
//         success: false,
//         message: "You are not authenticated to purchase this course",
//       });
//     }

//     const newPurchaseCourse = new Purchase({
//       userID,
//       courseId,
//     });

//     await newPurchaseCourse.save();

//     return res
//       .status(201)
//       .json({ success: true, message: "Course Puchases successfully" });
//   } catch (error) {
//     console.log("Error in purchaseCourseRoutes Controllers", error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Internal Server Error" });
//   }
// };





// Purchase Course new endpoint 


export const purchaseCourse = async (req, res) => {
   // tasks check from the middleware user is authenticated 
   // then check the couseId in the purchase Schema id the course Id exist the course already exist 
   // check in the course Schema is the course exist 
  try {
    const {courseId} = req.params;
    const userId = req.user._id

    const course = await Course.findById(courseId) 
    if(!course) {
      return res.status(404).json({success: false, message: "Course does not exist 😔"})
    }

   // checking is the course already purchased in the purchase Schema to prevent the duplicat purchase 
   const isCourseAlreadyPurchase = await Purchase.findOne({ userID: userId ,courseId})

   if(isCourseAlreadyPurchase) {
    return res.status(403).json({success: false, message: "You already Purchased this Course"})
   }

   const newPurchase = new Purchase({
    userID: userId,
    courseId
   })

   await newPurchase.save()

   return res.status(200).json({success: true, message: "You successfully purchased this course 🎉", newPurchase})

  } catch (error) {
    console.log("Error while purchasing the course", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
  
}




export const getPurchaseCourse = async (req, res) => {
  try {
  } catch (error) {}
};
