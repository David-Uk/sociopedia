import { login, register } from "../controllers/Auth.js";
import express from "express";

const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);

export default authRoutes;
