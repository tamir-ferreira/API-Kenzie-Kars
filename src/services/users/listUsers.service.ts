import { Repository } from "typeorm";
import { User } from "../../entities/users.entity";
import { UserResponseMultiple } from "../../interfaces/users.interfaces";
import { AppDataSource } from "../../data-source";
import { multipleUserSchemaResponse } from "../../schemas/users.schemas";

const listUsersService = async (): Promise<UserResponseMultiple> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const users: User[] = await userRepository.find({
    relations: { address: true },
  });

  return multipleUserSchemaResponse.parse(users);
};

export default listUsersService;
