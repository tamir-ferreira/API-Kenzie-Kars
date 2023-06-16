import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import { Repository } from "typeorm";
import { userSchemaResponse } from "../../schemas/users.schemas";

export const listUserByIdService = async (idUser: number): Promise<any> => {
  const categoryRepository: Repository<User> =
    AppDataSource.getRepository(User);

  const findUser = await categoryRepository.findOne({
    where: {
      id: idUser,
    },
  });

  const categories = userSchemaResponse.parse(findUser);

  return categories;
};
