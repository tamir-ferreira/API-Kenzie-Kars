import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors";

const checkAdvertOwnershipMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const loggedUser: number = Number(res.locals.userId);
  const advert = res.locals.advert;

  if (advert.user.id !== loggedUser) {
    throw new AppError("Você não possui permissão", 403);
  }
  return next();
};

export default checkAdvertOwnershipMiddleware;
