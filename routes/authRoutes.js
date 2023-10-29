import { login, register } from "../controllers/Auth.js";
import express from "express";
import upload from "../utils/upload.js";

const authRoutes = express.Router();

authRoutes.post("/register", upload.single("picture"), register);
authRoutes.post("/login", login);

export default authRoutes;
