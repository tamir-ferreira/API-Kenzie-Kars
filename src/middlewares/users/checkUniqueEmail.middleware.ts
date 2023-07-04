import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";

const checkUniqueMailMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (user) {
    return res.status(400).json({
      message: "Email já registrado",
    });
  }

  return next();
};

export default checkUniqueMailMiddleware;
