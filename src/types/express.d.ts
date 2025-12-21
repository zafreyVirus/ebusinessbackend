import { User } from "@prisma/client";
import express from "express";
import { AuthUser } from "./auth.js";

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export {};

