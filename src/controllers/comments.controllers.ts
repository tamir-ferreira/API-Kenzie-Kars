import { Request, Response } from "express";
import createCommentService from "../services/comments/createComment.service";
import listCommentsService from "../services/comments/readComments.service";
import listCommentByIdService from "../services/comments/readCommentById.service";
import deleteCommentService from "../services/comments/deleteComment.service";
import updateCommentService from "../services/comments/updateComment.service";

export const createCommentController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newComment = await createCommentService(
    res.locals.userId,
    req.params.id,
    req.body
  );
  return res.status(201).json(newComment);
};

export const listCommentsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const comments = await listCommentsService();
  return res.status(200).json(comments);
};

export const listCommentByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const comment = await listCommentByIdService(Number(req.params.id));
  return res.status(200).json(comment);
};

export const updateCommentController = async (req: Request, res: Response) => {
  const updatedComment = await updateCommentService(
    Number(req.params.id),
    req.body
  );
  return res.status(200).json(updatedComment);
};

export const deleteCommentController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await deleteCommentService(Number(req.params.id));
  return res.status(204).json();
};
