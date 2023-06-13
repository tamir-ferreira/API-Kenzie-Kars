import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";
import { Advert } from "../../entities/adverts.entity";

const deleteAdvertService = async (id: number): Promise<void> => {
  const advertRepository: Repository<Advert> =
    AppDataSource.getRepository(Advert);
  const advert: Advert | null = await advertRepository.findOneBy({ id: id });

  await advertRepository.remove(advert!);
};

export default deleteAdvertService;
