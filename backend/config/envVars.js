// import dotenv from "dotenv";
import * as dotenv from 'dotenv'

import razorpay from "razorpay"

dotenv.config();

export const env_Vars={
  PORT:process.env.PORT,
  MONGO_URL:process.env.MONGO_URL,
  USER_SECRET_TOKEN:process.env.USER_SECRET_TOKEN,
  ADMIN_SECRET_TOKEN: process.env.ADMIN_SECRET_TOKEN,
  NODE_ENV:process.env.NODE_ENV,
  VITE_RAZORPAY_KEY_ID:process.env.VITE_RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET:process.env.RAZORPAY_KEY_SECRET
};


export const CreateRazorpayInstance = () => {
  return new razorpay({
    key_id:env_Vars.VITE_RAZORPAY_KEY_ID,
    key_secret:env_Vars.RAZORPAY_KEY_SECRET
  })
}