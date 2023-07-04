import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import { Repository } from "typeorm";
import { userSchemaResponse } from "../../schemas/users.schemas";

const readUserByIdService = async (idUser: number): Promise<any> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOne({
    where: {
      id: idUser,
    },
  });

  const categories = userSchemaResponse.parse(findUser);

  return categories;
};

export default readUserByIdService;
