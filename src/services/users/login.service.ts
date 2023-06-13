import { Repository } from "typeorm";
import { LoginRequest } from "../../interfaces/users.interfaces";
import { User } from "../../entities/users.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

const loginService = async (loginData: LoginRequest): Promise<string> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOne({
    where: {
      email: loginData.email,
    },
  });

  if (!user) {
    throw new AppError("Wrong email or password", 401);
  }

  const verifyPassword = await compare(loginData.password, user.password);

  if (!verifyPassword) {
    throw new AppError("Wrong email or password", 401);
  }

  const token = jwt.sign(
    { admin: user.admin },
    String(process.env.SECRET_KEY),
    {
      expiresIn: "24h",
      subject: String(user.id),
    }
  );

  return token;
};

export default loginService;
