import express from "express";
import { env_Vars } from "./config/envVars.js";
import { connectToMongoDbUrl } from "./config/connectToMongoDb.js";
const app = express();

const PORT = env_Vars.PORT;

app.listen(PORT, () => {
  console.log(`App is Running on http://localhost:${PORT}`);
  connectToMongoDbUrl();
});
