import { register } from "../controllers/Auth.js";
import express from "express";

const authRoutes = express.Router();

authRoutes.post("/register", register);

export default authRoutes;
