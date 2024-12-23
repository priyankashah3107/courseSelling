import express from "express";
import { env_Vars } from "./config/envVars.js";
import { connectToMongoDbUrl } from "./config/connectToMongoDb.js";
import authRoutes from "../backend/routes/user.routes.js";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import courseRoutes from "../backend/routes/courses.routes.js";
import { protectRoute } from "./middlewars/protectRoute.js";
import categoryRoutes from "../backend/routes/categories.routes.js";
import { getCourseById } from "./controllers/course.controllers.js";
import purchaseRoutes from "../backend/routes/purchase.routes.js";
import adminRoutes from "../backend/routes/admin.routes.js";
const app = express();

const PORT = env_Vars.PORT;
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/courses", protectRoute, courseRoutes);
app.use("/api/v1/categories", protectRoute, categoryRoutes);
app.use("/api/v1/purchased", protectRoute, purchaseRoutes);
app.use("/api/v1/admin", adminRoutes);

app.listen(PORT, () => {
  console.log(`App is Running on http://localhost:${PORT}`);
  connectToMongoDbUrl();
});
