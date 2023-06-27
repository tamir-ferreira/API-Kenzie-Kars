import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";
import { Comment } from "../../entities/comments.entity";
import { AppError } from "../../errors";

const deleteCommentService = async (id: number): Promise<void> => {
  const commentRepository: Repository<Comment> =
    AppDataSource.getRepository(Comment);
  const comment: Comment | null = await commentRepository.findOneBy({ id: id });

  if (!comment) {
    throw new AppError("Comentário não encontrado", 404);
  }

  await commentRepository.remove(comment!);
};

export default deleteCommentService;
