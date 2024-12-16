import express from "express";
import { env_Vars } from "./config/envVars.js";
import { connectToMongoDbUrl } from "./config/connectToMongoDb.js";
import authRoutes from "../backend/routes/user.routes.js";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

const PORT = env_Vars.PORT;
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`App is Running on http://localhost:${PORT}`);
  connectToMongoDbUrl();
});
