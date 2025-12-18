import dotenv from "dotenv";
import path from "node:path";

dotenv.config({path: ".env"})

export const PORT = process.env.PORT

export const connectionString = process.env.DATABASE_URL

export const JWT_SECRET = process.env.JWT_SECRET!