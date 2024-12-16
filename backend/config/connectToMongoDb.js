import mongoose from "mongoose";
import { env_Vars } from "./envVars.js";

export const connectToMongoDbUrl = async () => {
  try {
    const connect = await mongoose.connect(env_Vars.MONGO_URL);
    console.log("Successfully Connected to MongoDb", connect.connection.host);
    return connect;
  } catch (error) {
    console.error("Error while connecting to the mongodb", error.message);
    process.exit(1);
  }
};
