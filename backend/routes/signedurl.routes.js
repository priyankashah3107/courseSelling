import { Router } from "express";
import {
  getSignedUrlHandler,
  putSignedUrlHandler,
} from "../controllers/getsignedurl.controllers.js";

const router = Router();

router.post("/get-signed-url", getSignedUrlHandler);
router.post("/put-signed-url", putSignedUrlHandler);

export default router;
