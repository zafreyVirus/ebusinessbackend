import { NextFunction, Request, Response } from "express"
import { UnauthorizedException } from "../exceptions/unauthorized.js"
import { ErrorCode } from "../exceptions/root.js"
import { JWT_SECRET } from "../secrets.js"
import { prismaClient } from "../index.js"
import jwt from "jsonwebtoken"

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return next(
      new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED_EXCEPTION)
    )
  }

  const token = authHeader.split(" ")[1]

  if (!token) {
    return next(
      new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED_EXCEPTION)
    )
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as any

    const user = await prismaClient.user.findFirst({
      where: { id: payload.userId }
    })

    if (!user) {
      return next(
        new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED_EXCEPTION)
      )
    }

    req.user = user
    next()
  } catch {
    return next(
      new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED_EXCEPTION)
    )
  }
}

export default authMiddleware
