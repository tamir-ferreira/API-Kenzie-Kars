import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";
import { User } from "../../entities/users.entity";
import { randomUUID } from "crypto";
import { AppError } from "../../errors";
import { emailService } from "../../utils/sendEmail.utils";

const sendEmailResetPasswordService = async (email: string) => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({
    email: email,
  });
  // console.log(user);
  if (!user) {
    throw new AppError("user not found", 404);
  }

  const resetToken = randomUUID();

  await userRepository.update({ email }, { reset_token: resetToken });

  const resetPasswordTemplate = emailService.resetPasswordTemplate(user.name, email, resetToken);
  // console.log(resetPasswordTemplate);

  await emailService.sendEmail(resetPasswordTemplate);
};

export default sendEmailResetPasswordService;
