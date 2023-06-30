import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";
import { tAdvert, tAdvertUpdate } from "../../interfaces/adverts.interfaces";
import { advertSchema } from "../../schemas/adverts.schemas";
import { Advert } from "../../entities/adverts.entity";
import { Image } from "../../entities/images.entity";

const updateAdvertService = async (
  data: tAdvertUpdate,
  id: number
): Promise<tAdvert> => {
  const advertRepository: Repository<Advert> =
    AppDataSource.getRepository(Advert);

  const imageRepository: Repository<Image> = AppDataSource.getRepository(Image);

  const oldData = await advertRepository.findOne({
    relations: { images: true },
    where: { id: id },
  });

  const newImages = imageRepository.create({
    ...oldData!.images,
    ...data.images,
  });
  await imageRepository.save(newImages);

  const advert = advertRepository.create({
    ...oldData,
    ...data,
    images: newImages,
  });

  await advertRepository.save(advert);

  const newAdvert = await advertRepository.findOne({
    relations: {
      images: true,
    },
    where: {
      id: id,
    },
  });

  return advertSchema.parse(newAdvert);
};

export default updateAdvertService;
