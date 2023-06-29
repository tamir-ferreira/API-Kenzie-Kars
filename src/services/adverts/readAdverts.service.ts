import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";
import { Advert } from "../../entities/adverts.entity";
import { iResMultipleAdverts } from "../../interfaces/adverts.interfaces";

const readAdvertsService = async (
  brand: any,
  model: any,
  color: any,
  year: any,
  fuel: any,
  mileage: any,
  price: any,
  query: any
): Promise<iResMultipleAdverts> => {
  const advertRepository: Repository<Advert> =
    AppDataSource.getRepository(Advert);

  let adverts: any;
  let page: number = +query.page || 1;
  let perPage: number = +query.perPage || 9;
  const advertCount: number = await advertRepository.count();

  if (page < 0) {
    page = 1;
  }

  if (perPage < 0) {
    perPage = 9;
  }

  if (
    brand == "" &&
    model == "" &&
    color == "" &&
    year == "" &&
    fuel == "" &&
    mileage == "" &&
    price == ""
  ) {
    adverts = await advertRepository.find({
      take: perPage,
      skip: perPage * (page - 1),
      relations: {
        user: true,
        comments: true,
      },
      order: {
        id: "ASC",
      },
    });
  } else {
    adverts = await advertRepository.find({
      take: perPage,
      skip: perPage * (page - 1),
      relations: {
        user: true,
        comments: true,
      },
      where: {
        brand: brand !== "" ? brand : null,
        model: model !== "" ? model : null,
        color: color !== "" ? color : null,
        year: year !== "" ? year : null,
        fuel: fuel !== "" ? fuel : null,
      },
      order: {
        id: "ASC",
        mileage: mileage !== "" ? mileage : undefined,
        price: price !== "" ? price : undefined,
      },
    });
  }

  const result: iResMultipleAdverts = {
    prevPage:
      page === undefined || page === 1
        ? null
        : `http://localhost:3000/adverts?page=${page - 1}&perPage=${perPage}`,
    nextPage:
      advertCount <= adverts.length + perPage * (page - 1)
        ? null
        : `http://localhost:3000/adverts?page=${page + 1}&perPage=${perPage}`,
    data: adverts,
  };

  return result;
};

export default readAdvertsService;
