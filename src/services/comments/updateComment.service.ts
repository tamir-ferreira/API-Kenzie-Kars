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

  const updatedComment: Comment | null = await commentRepository.findOne({
    where: { id: id },
    relations: { user: true, advert: true },
  });

  if (!updatedComment) {
    throw new AppError("Comentário não encontrado", 404);
  }

  return updatedComment;
};

export default updateCommentService;
