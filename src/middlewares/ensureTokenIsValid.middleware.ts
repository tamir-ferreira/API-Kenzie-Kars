import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const verifyTokenMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let token: string | undefined = request.headers.authorization;

  if (!token) {
    throw new AppError("Token is missing", 401);
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY!, (error: any, decoded: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }

    response.locals.userId = decoded.sub;

    return next();
  });
};
