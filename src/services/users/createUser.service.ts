import { Repository } from "typeorm";
import { User } from "../../entities/users.entity";
import { UserRequest, UserResponse } from "../../interfaces/users.interfaces";
import { AppDataSource } from "../../data-source";
import { userSchemaResponse } from "../../schemas/users.schemas";

const createUserService = async (
  userData: UserRequest
): Promise<UserResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const userColor: string =
    "#" +
    Math.floor(Math.random() * 0x1000000)
      .toString(16)
      .padStart(6, "0");

  const user: User = userRepository.create({
    ...userData,
    color: userColor,
  });

  await userRepository.save(user);

  const userReturn: UserResponse = userSchemaResponse.parse(user);

  return userReturn;
};

export default createUserService;
