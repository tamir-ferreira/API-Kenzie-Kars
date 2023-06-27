import { Request, Response, NextFunction } from "express";

const checkOwnershipMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const loggedUser: number = Number(res.locals.userId);

  if (Number(req.params.id) !== loggedUser) {
    return res.status(403).json({
      message: "Você não possui permissão",
    });
  }

  return next();
};

export default checkOwnershipMiddleware;
