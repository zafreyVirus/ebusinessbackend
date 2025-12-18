import { Router } from "express";
import { login, signup } from "../controllers/auth.js";
import { errorHandler } from "../error_handler.js";

const authRoutes:Router = Router()

authRoutes.post("/signup", errorHandler(signup))
authRoutes.post("/login", errorHandler(login))

export default authRoutes;