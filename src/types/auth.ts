import { Role } from "../generated/prisma/index.js";

export interface AuthUser {
  id: number;
  role: Role;
  defaultShippingAddress?: string
}
