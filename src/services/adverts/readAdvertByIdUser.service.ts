import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";
import { Advert } from "../../entities/adverts.entity";
import { iResMultipleAdverts } from "../../interfaces/adverts.interfaces";
import { AppError } from "../../errors";

const readAdvertByIdUserService = async (
  id: number,
  query: any
): Promise<iResMultipleAdverts> => {
  const advertRepository: Repository<Advert> =
    AppDataSource.getRepository(Advert);

  let page: number = +query.page || 1;
  let perPage: number = +query.perPage || 9;

  if (page < 0) {
    page = 1;
  }

  if (perPage < 0) {
    perPage = 9;
  }

  const advert: Array<Advert> | null = await advertRepository.find({
    where: {
      user: {
        id: id,
      },
    },
    relations: {
      user: true,
      comments: true,
    },
    take: perPage,
    skip: perPage * (page - 1),
  });
  const advertUnique: Array<Advert> | null = await advertRepository.find({
    where: {
      user: {
        id: id,
      },
    },
    relations: {
      user: true,
      comments: true,
    },
  });

  if (!advert) {
    throw new AppError("Anúncio não encontrado", 404);
  }

  const result: iResMultipleAdverts = {
    prevPage:
      page === undefined || page === 1
        ? null
        : `http://localhost:3000/adverts/user?page=${
            page - 1
          }&perPage=${perPage}`,
    nextPage:
      advertUnique.length <= advert.length + perPage * (page - 1)
        ? null
        : `http://localhost:3000/adverts/user?page=${
            page + 1
          }&perPage=${perPage}`,
    data: advert,
  };

  return result;
};

export default readAdvertByIdUserService;
