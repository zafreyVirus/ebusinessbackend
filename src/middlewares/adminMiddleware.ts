import { NextFunction, Request, Response } from "express"
import { UnauthorizedException } from "../exceptions/unauthorized.js"
import { ErrorCode } from "../exceptions/root.js"

const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

    const user = req.user

  if (!user) {
    return next(
      new UnauthorizedException("Unauthenticated", ErrorCode.UNAUTHORIZED_EXCEPTION)
    );
  }

  if (user.role == "ADMIN") {
    return next();
  }

  return next(
    new UnauthorizedException("Unauthorized user", ErrorCode.UNAUTHORIZED_EXCEPTION)
  );
};

export default adminMiddleware;

