import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../data-source";
import { Advert } from "../../entities/adverts.entity";

const ensureAdvertExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const advertRepository = AppDataSource.getRepository(Advert);

  const id: number = Number(req.params.id);

  const advert = await advertRepository.findOne({
    where: {
      id: id,
    },
  });

  if (!advert) {
    return res.status(404).json({
      message: "Advert not found",
    });
  }

  return next();
};

export default ensureAdvertExists;
