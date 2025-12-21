import { Router } from "express";
import authRoutes from "./auth.js";
import productRoutes from "./product.js";
import authMiddleware from "../middlewares/auth.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const rootRouter = Router()

rootRouter.use("/auth", authRoutes)
rootRouter.use('/products', productRoutes)


export default rootRouter