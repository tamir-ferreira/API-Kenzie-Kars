import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";
import { User } from "../../entities/users.entity";

import { AppError } from "../../errors";

const resetPasswordService = async (password: string, resetToken: string) => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    reset_token: resetToken,
  });

  if (!user) {
    throw new AppError("Usuário não encontrado", 404);
  }

  const foundUser = await userRepository.findOneBy({ id: user.id });

  if (foundUser) {
    foundUser.password = password;
    foundUser.reset_token = null;
    await userRepository.save(foundUser);
  }
};

export default resetPasswordService;
