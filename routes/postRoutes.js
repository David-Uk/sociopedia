import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { createPost, getFeedPosts } from "../controllers/Posts.js";
import upload from "../utils/upload.js";

const postRoutes = express.Router();

postRoutes.post("/", verifyToken, upload.single("picture"), createPost);
postRoutes.get("/", verifyToken, getFeedPosts);

export default postRoutes;
