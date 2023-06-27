import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../data-source";
import { Address } from "../../entities/addresses.entity";

export const ensureAddressExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const addressRepository = AppDataSource.getRepository(Address);

  const id: number = Number(req.params.id);

  const address = await addressRepository.findOne({
    where: {
      id: id,
    },
  });

  if (!address) {
    return res.status(404).json({
      message: "Address not found",
    });
  }

  return next();
};

export default ensureAddressExistsMiddleware;
