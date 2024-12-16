import dotenv from "dotenv";

dotenv.config();

export const env_Vars = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  SECRET_TOKEN: process.env.SECRET_TOKEN,
};
