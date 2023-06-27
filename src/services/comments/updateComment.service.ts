import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import {
  tCommentRequest,
  tCommentResponse,
} from "../../interfaces/comments.interfaces";
import { Comment } from "../../entities/comments.entity";

const updateCommentService = async (
  id: number,
  data: tCommentRequest
): Promise<tCommentResponse> => {
  const commentRepository: Repository<Comment> =
    AppDataSource.getRepository(Comment);

  const oldComment: Comment | null = await commentRepository.findOne({
    where: { id: id },
    relations: { user: true, advert: true },
  });

  if (!oldComment) {
    throw new AppError("Comentário não encontrado", 404);
  }

  await commentRepository
    .createQueryBuilder()
    .update(Comment)
    .set(data)
    .where("id = :id", { id: id })
    .execute();

  const comment: Comment | null = await commentRepository
    .createQueryBuilder("comments")
    .select(["comments", "users.id", "users.name", "users.email", "adverts.id"])
    .innerJoin("comments.user", "users")
    .innerJoin("comments.advert", "adverts")
    .where("comments.id = :id", { id: id })
    .getOne();

  if (!comment) {
    throw new AppError("Comentário não encontrado", 404);
  }

  return comment;
};

export default updateCommentService;
