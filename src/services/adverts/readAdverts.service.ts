import { AppDataSource } from '../../data-source';
import { Repository } from 'typeorm';
import { tAdvertMultiple } from '../../interfaces/adverts.interfaces';
import { advertSchemaMultiple } from '../../schemas/adverts.schemas';
import Advert from '../../entities/adverts.entity';

const readAdvertsService = async (): Promise<tAdvertMultiple> => {
  const advertRepository: Repository<Advert> =
    AppDataSource.getRepository(Advert);

  const adverts: Advert[] = await advertRepository.find();

  return advertSchemaMultiple.parse(adverts);
};

export default readAdvertsService;
