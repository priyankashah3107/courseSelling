import express from "express";
import { env_Vars } from "./config/envVars.js";
import { connectToMongoDbUrl } from "./config/connectToMongoDb.js";
import authRoutes from "../backend/routes/user.routes.js";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import courseRoutes from "../backend/routes/courses.routes.js";
import categoryRoutes from "../backend/routes/categories.routes.js";
import { getCourseById } from "./controllers/course.controllers.js";
import purchaseRoutes from "../backend/routes/purchase.routes.js";
import adminRoutes from "../backend/routes/admin.routes.js";
import { protectRoute_SECRET_TOKEN } from "./middlewars/protectRoute.js";
import { getPurchasedCourseUserById } from "./controllers/purchase.controllers.js";
import buyDeatils from "../backend/routes/buydetails.routes.js"
import signedUrl from "../backend/routes/signedurl.routes.js"
const app = express();

const PORT = env_Vars.PORT;
// app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true, // Allows cookies to be sent and received
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
// app.use(
//   "/api/v1/courses",
//   protectRoute_SECRET_TOKEN(env_Vars.USER_SECRET_TOKEN),
//   courseRoutes
// );
app.use(
  "/api/v1/courses",

  courseRoutes
);
// app.use(
//   "/api/v1/categories",
//   protectRoute_SECRET_TOKEN(env_Vars.USER_SECRET_TOKEN),
//   categoryRoutes
// );


app.use(
  "/api/v1/categories",
  protectRoute_SECRET_TOKEN(env_Vars.ADMIN_SECRET_TOKEN),
  categoryRoutes
);
app.use(
  "/api/v1/purchased",
  protectRoute_SECRET_TOKEN(env_Vars.USER_SECRET_TOKEN),
  purchaseRoutes
);
app.use("/api/v1/admin", adminRoutes);
 
app.use("/api/v1/viewbuy", buyDeatils);

app.use("/api/v1", signedUrl)

app.listen(PORT, () => {
  console.log(`App is Running on http://localhost:${PORT}`);
  connectToMongoDbUrl();
});
