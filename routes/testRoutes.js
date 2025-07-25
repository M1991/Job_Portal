import express from "express";
import { testPostController } from "../controller/testContoller.js";
import userAuth from "../middlewares/authMiddleware.js"

// router object
const router = express.Router();

// routes
router.post("/test-post", userAuth, testPostController);

// export
export default router;