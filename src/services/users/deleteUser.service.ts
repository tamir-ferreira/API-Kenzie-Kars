import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";
import { User } from "../../entities/users.entity";

const deleteUserService = async (id: number): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const user: User | null = await userRepository.findOneBy({ id: id });

  await userRepository.remove(user!);
};

export default deleteUserService;
