import { AppDataSource } from '../../data-source';
import { Repository } from 'typeorm';
import { tAdvert, tAdvertUpdate } from '../../interfaces/adverts.interfaces';
import { advertSchema } from '../../schemas/adverts.schemas';
import Advert from '../../entities/adverts.entity';

const updateAdvertService = async (
  data: tAdvertUpdate,
  id: number
): Promise<tAdvert> => {
  const advertRepository: Repository<Advert> =
    AppDataSource.getRepository(Advert);

  const oldData = await advertRepository.findOneBy({
    id: id,
  });

  const advert = advertRepository.create({
    ...oldData,
    ...data,
  });

  await advertRepository.save(advert);

  return advertSchema.parse(advert);
};

export default updateAdvertService;
