import { Repository } from "typeorm";
import { User } from "../../entities/users.entity";
import { AppDataSource } from "../../data-source";
import { Advert } from "../../entities/adverts.entity";
import { AppError } from "../../errors";
import {
  tCommentRequest,
  tCommentResponse,
} from "../../interfaces/comments.interfaces";
import { Comment } from "../../entities/comments.entity";

const createCommentService = async (
  id: number,
  queryParam: string,
  data: tCommentRequest
): Promise<tCommentResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const advertRepository: Repository<Advert> =
    AppDataSource.getRepository(Advert);
  const commentRepository: Repository<Comment> =
    AppDataSource.getRepository(Comment);

  const foundUser: User | null = await userRepository.findOne({
    where: {
      id: id,
    },
  });

  if (!foundUser) {
    throw new AppError("Usuário não encontrado", 404);
  }

  const foundAdvert: Advert | null = await advertRepository.findOne({
    where: {
      id: Number(queryParam),
    },
  });

  if (!foundAdvert) {
    throw new AppError("Anúncio não encontrado", 404);
  }

  const commentResult = await commentRepository
    .createQueryBuilder()
    .insert()
    .into(Comment)
    .values({
      ...data,
      user: foundUser,
      advert: foundAdvert,
    })
    .returning("*")
    .execute();

  const insertedComment = commentResult.raw[0];

  return insertedComment;
};

export default createCommentService;
