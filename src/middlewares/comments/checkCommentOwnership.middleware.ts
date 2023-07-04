import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors";

const checkCommentOwnershipMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const loggedUser: number = Number(res.locals.userId);
  const comment = res.locals.comment;

  if (comment.user.id !== loggedUser) {
    throw new AppError("Você não possui permissão", 403);
  }
  return next();
};

export default checkCommentOwnershipMiddleware;
