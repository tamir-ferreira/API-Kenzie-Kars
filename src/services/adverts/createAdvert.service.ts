import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";
import { tAdvertRequest, tAdvert } from "../../interfaces/adverts.interfaces";
import { advertSchema } from "../../schemas/adverts.schemas";
import { Advert } from "../../entities/adverts.entity";
import { User } from "../../entities/users.entity";

const createAdvertService = async (
  data: tAdvertRequest,
  userId: number
): Promise<tAdvert> => {
  const advertRepository: Repository<Advert> =
    AppDataSource.getRepository(Advert);

  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  const advert: Advert = advertRepository.create({ ...data, user: user! });

  await advertRepository.save(advert);

  return advertSchema.parse(advert);
};

export default createAdvertService;
