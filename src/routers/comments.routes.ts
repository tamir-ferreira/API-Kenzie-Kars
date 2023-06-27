import { Router } from "express";
import verifyTokenMiddleware from "../middlewares/jwt/ensureTokenIsValid.middleware";
import ensureDataIsValidMiddleware from "../middlewares/jwt/ensureDataIsValid.middleware";
import {
  createCommentController,
  deleteCommentController,
  listCommentByIdController,
  listCommentsController,
  updateCommentController,
} from "../controllers/comments.controllers";
import {
  commentSchemaRequest,
  commentSchemaUpdate,
} from "../schemas/comments.schemas";
import checkCommentOwnershipMiddleware from "../middlewares/comments/checkCommentOwnership.middleware";
import ensureCommentExistsMiddleware from "../middlewares/comments/ensureCommentExists.middleware";

const commentsRoutes: Router = Router();

//commentsRoutes.use(verifyTokenMiddleware);

commentsRoutes.post(
  "/:id",
  verifyTokenMiddleware,
  ensureDataIsValidMiddleware(commentSchemaRequest),
  createCommentController
);

commentsRoutes.get("", listCommentsController);

commentsRoutes.get("/:id", verifyTokenMiddleware, listCommentByIdController);

commentsRoutes.patch(
  "/:id",
  verifyTokenMiddleware,
  ensureDataIsValidMiddleware(commentSchemaUpdate),
  ensureCommentExistsMiddleware,
  checkCommentOwnershipMiddleware,
  updateCommentController
);

commentsRoutes.delete(
  "/:id",
  verifyTokenMiddleware,
  ensureCommentExistsMiddleware,
  checkCommentOwnershipMiddleware,
  deleteCommentController
);

export default commentsRoutes;
