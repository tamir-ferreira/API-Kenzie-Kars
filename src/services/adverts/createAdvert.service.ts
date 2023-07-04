import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";
import { tAdvertRequest, tAdvert } from "../../interfaces/adverts.interfaces";
import { advertSchema } from "../../schemas/adverts.schemas";
import { Advert } from "../../entities/adverts.entity";
import { User } from "../../entities/users.entity";
import { Image } from "../../entities/images.entity";
import { tImages } from "../../interfaces/images.interface";
import { returnImagesSchema } from "../../schemas/images.schemas";

const createAdvertService = async (
  data: tAdvertRequest,
  userId: number
): Promise<tAdvert | void> => {
  const advertRepository: Repository<Advert> =
    AppDataSource.getRepository(Advert);

  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const imageRepository: Repository<Image> = AppDataSource.getRepository(Image);

  const imageObj: tImages | null | undefined = data.images;

  if (imageObj !== undefined && imageObj !== null) {
    imageRepository.create(imageObj);
    await imageRepository.save(imageObj);
    const newGallery = returnImagesSchema.parse(imageObj);
    const user: User | null = await userRepository.findOne({
      where: {
        id: userId,
      },
    });

    const gallery: Image | null = await imageRepository.findOne({
      where: {
        id: newGallery.id,
      },
    });

    const advert: Advert = advertRepository.create({
      ...data,
      user: user!,
      images: gallery,
    });

    await advertRepository.save(advert);

    return advertSchema.parse(advert);
  } else {
    const user: User | null = await userRepository.findOne({
      where: {
        id: userId,
      },
    });

    const advert: Advert = advertRepository.create({
      ...data,
      user: user!,
      images: null,
    });

    await advertRepository.save(advert);

    return advertSchema.parse(advert);
  }
};

export default createAdvertService;
