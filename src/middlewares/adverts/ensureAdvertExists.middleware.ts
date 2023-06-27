import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../data-source";
import { Advert } from "../../entities/adverts.entity";

const ensureAdvertExistsMiddleware = async (
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
    relations: {
      user: true,
      comments: true,
    },
  });

  if (!advert) {
    return res.status(404).json({
      message: "Anúncio não encontrado",
    });
  } else {
    res.locals.advert = advert;
    return next();
  }
};

export default ensureAdvertExistsMiddleware;
