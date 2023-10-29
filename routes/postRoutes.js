import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { createPost } from "../controllers/Posts.js";
import upload from "../utils/upload.js";

const postRoutes = express.Router();

postRoutes.post("/", verifyToken, upload.single("picture"), createPost);

export default postRoutes;
