import { AppDataSource } from "../../data-source";
import { Comment } from "../../entities/comments.entity";
import { Repository } from "typeorm";
import { tCommentResponseMultiple } from "../../interfaces/comments.interfaces";

const readCommentsService = async (): Promise<tCommentResponseMultiple> => {
  const commentRepository: Repository<Comment> =
    AppDataSource.getRepository(Comment);

  const comments = commentRepository
    .createQueryBuilder("comments")
    .select([
      "comments",
      "users.id",
      "users.name",
      "users.email",
      "users.color",
      "adverts.id",
    ])
    .innerJoin("comments.user", "users")
    .innerJoin("comments.advert", "adverts")
    .getMany();

  return comments;
};

export default readCommentsService;
