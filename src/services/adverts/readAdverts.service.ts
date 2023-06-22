import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";
import { tAdvertMultiple } from "../../interfaces/adverts.interfaces";
import { advertSchemaMultiple } from "../../schemas/adverts.schemas";
import { Advert } from "../../entities/adverts.entity";
import { log } from "console";

const readAdvertsService = async (
  brand: any,
  model: any,
  color: any,
  year: any,
  fuel: any
): Promise<tAdvertMultiple> => {
  const advertRepository: Repository<Advert> =
    AppDataSource.getRepository(Advert);

  let adverts: any;

  console.log(model);
  console.log(brand);

  if (brand == "" && model == "" && color == "" && year == "" && fuel == "") {
    adverts = await advertRepository.find({
      relations: {
        user: true,
      },
    });
  } else {
    adverts = await advertRepository.find({
      relations: {
        user: true,
      },
      where: {
        brand: brand !== "" ? brand : null,
        model: model !== "" ? model : null,
        color: color !== "" ? color : null,
        year: year !== "" ? year : null,
        fuel: fuel !== "" ? fuel : null,
      },
    });
  }

  return advertSchemaMultiple.parse(adverts);
};

export default readAdvertsService;
