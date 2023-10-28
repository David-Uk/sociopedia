import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  addRemoveFriend,
  getUser,
  getUserFriends,
} from "../controllers/User.js";

const userRoutes = express.Router();

userRoutes.get("/:id", verifyToken, getUser);
userRoutes.get("/:id/friends", verifyToken, getUserFriends);

userRoutes.patch("/:id/friendId", verifyToken, addRemoveFriend);

export default userRoutes;
