import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  createPost,
  getFeedPosts,
  getUserPosts,
  likePost,
} from "../controllers/Posts.js";
import upload from "../utils/upload.js";

const postRoutes = express.Router();

postRoutes.post("/", verifyToken, upload.single("picture"), createPost);
postRoutes.get("/", verifyToken, getFeedPosts);
postRoutes.get("/:id", verifyToken, getUserPosts);
postRoutes.patch("/like/:id", verifyToken, likePost);

export default postRoutes;
