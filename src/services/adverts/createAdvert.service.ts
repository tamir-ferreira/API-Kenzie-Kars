import { AppDataSource } from '../../data-source';
import { Repository } from 'typeorm';
import { tAdvertRequest, tAdvert } from '../../interfaces/adverts.interfaces';
import { advertSchema } from '../../schemas/adverts.schemas';
import Advert from '../../entities/adverts.entity';

const createAdvertService = async (data: tAdvertRequest): Promise<tAdvert> => {
  const advertRepository: Repository<Advert> =
    AppDataSource.getRepository(Advert);

  const advert: Advert = advertRepository.create({ ...data });

  await advertRepository.save(advert);

  return advertSchema.parse(advert);
};

export default createAdvertService;
