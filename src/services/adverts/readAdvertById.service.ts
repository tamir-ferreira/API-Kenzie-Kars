import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";
import { advertSchema } from "../../schemas/adverts.schemas";
import { Advert } from "../../entities/adverts.entity";
import { tAdvert } from "../../interfaces/adverts.interfaces";
import { AppError } from "../../errors";

const readAdvertByIdService = async (id: number): Promise<tAdvert> => {
  const advertRepository: Repository<Advert> =
    AppDataSource.getRepository(Advert);

  const advert: Advert | null = await advertRepository.findOne({
    where: { id: id },
    relations: {
      user: true,
      comments: true,
    },
  });

  if (!advert) {
    throw new AppError("Anúncio não encontrado", 404);
  }

  return advertSchema.parse(advert);
};

export default readAdvertByIdService;
