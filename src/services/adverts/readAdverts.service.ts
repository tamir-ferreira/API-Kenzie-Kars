import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";
import { Advert } from "../../entities/adverts.entity";
import { iResMultipleAdverts } from "../../interfaces/adverts.interfaces";

const readAdvertsService = async (query: any): Promise<iResMultipleAdverts> => {
  const advertRepository: Repository<Advert> =
    AppDataSource.getRepository(Advert);

  let adverts: any;
  let advertsQuant: any;
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
    query.brand == "" &&
    query.model == "" &&
    query.color == "" &&
    query.year == "" &&
    query.fuel == "" &&
    query.mileage == "" &&
    query.price == ""
  ) {
    adverts = await advertRepository.find({
      where: {
        is_active: true,
      },
      relations: {
        user: true,
        comments: true,
        images: true,
      },
      order: {
        id: "ASC",
      },
      take: perPage,
      skip: perPage * (page - 1),
    });
  } else {
    adverts = await advertRepository.find({
      relations: {
        user: true,
        comments: true,
        images: true,
      },
      where: {
        brand: query.brand !== "" ? query.brand : null,
        model: query.model !== "" ? query.model : null,
        color: query.color !== "" ? query.color : null,
        year: query.year !== "" ? query.year : null,
        fuel: query.fuel !== "" ? query.fuel : null,
        is_active: true,
      },
      order: {
        mileage: query.mileage !== "" ? query.mileage : undefined,
        price: query.price !== "" ? query.price : undefined,
      },
      take: perPage,
      skip: perPage * (page - 1),
    });
  }

  if (
    query.brand == "" &&
    query.model == "" &&
    query.color == "" &&
    query.year == "" &&
    query.fuel == "" &&
    query.mileage == "" &&
    query.price == ""
  ) {
    advertsQuant = await advertRepository.find({
      where: {
        is_active: true,
      },
      relations: {
        user: true,
        comments: true,
        images: true,
      },
    });
  } else {
    advertsQuant = await advertRepository.find({
      relations: {
        user: true,
        comments: true,
        images: true,
      },
      where: {
        brand: query.brand !== "" ? query.brand : null,
        model: query.model !== "" ? query.model : null,
        color: query.color !== "" ? query.color : null,
        year: query.year !== "" ? query.year : null,
        fuel: query.fuel !== "" ? query.fuel : null,
        is_active: true,
      },
    });
  }

  const result: iResMultipleAdverts = {
    prevPage:
      page === undefined || page === 1
        ? null
        : `http://localhost:3000/adverts?page=${
            page - 1
          }&perPage=${perPage}&brand=${query.brand}&model=${
            query.model
          }&color=${query.color}&year=${query.year}&fuel=${
            query.fuel
          }&mileage=${query.mileage}&price=${query.price}`,
    nextPage:
      advertsQuant.length <= adverts.length + perPage * (page - 1)
        ? null
        : `http://localhost:3000/adverts?page=${
            page + 1
          }&perPage=${perPage}&brand=${query.brand}&model=${
            query.model
          }&color=${query.color}&year=${query.year}&fuel=${
            query.fuel
          }&mileage=${query.mileage}&price=${query.price}`,
    data: adverts,
  };

  return result;
};

export default readAdvertsService;
