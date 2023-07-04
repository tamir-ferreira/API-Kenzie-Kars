import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../data-source";
import { Comment } from "../../entities/comments.entity";

const ensureCommentExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const commentRepository = AppDataSource.getRepository(Comment);

  const id: number = Number(req.params.id);

  const comment = await commentRepository.findOne({
    where: {
      id: id,
    },
    relations: {
      user: true,
      advert: true,
    },
  });

  if (!comment) {
    return res.status(404).json({
      message: "Comentário não encontrado",
    });
  } else {
    res.locals.comment = comment;
    return next();
  }
};

export default ensureCommentExistsMiddleware;
