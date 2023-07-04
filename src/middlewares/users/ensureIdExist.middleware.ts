import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors";

const ensureUserExistsMiddleware = async (
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
      throw new AppError("Usuário não encontrado", 404);
    }
    return next();
  }
  return next();
};

export default ensureUserExistsMiddleware;
