import dotenv from "dotenv";

dotenv.config();

export const env_Vars = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  USER_SECRET_TOKEN: process.env.USER_SECRET_TOKEN,
  ADMIN_SECRET_TOKEN: process.env.ADMIN_SECRET_TOKEN,
  NODE_ENV: process.env.NODE_ENV,
};
