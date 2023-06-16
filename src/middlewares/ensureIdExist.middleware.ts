import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/users.entity";
import { AppError } from "../errors";

export const ensureIdExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (req.params.id) {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const findIdUser = await userRepository.findOne({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (!findIdUser) {
      throw new AppError("User not found", 404);
    }
    return next();
  }
  return next();
};
