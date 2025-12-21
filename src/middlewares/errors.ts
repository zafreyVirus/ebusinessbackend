import { ErrorRequestHandler } from "express";
import { HttpException } from "../exceptions/root.js";

export const errorMiddleware: ErrorRequestHandler = (
  error: HttpException,
  req,
  res,
  next
) => {
  console.error("🔥 REAL ERROR:", error);
  
  res.status(error.statusCode || 500).json({
    message: error.message,
    errorCode: error.errorCode,
    errors: error.errors,
  });
};
