import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  readUserByIdController,
  readUsersController,
  updateUserController,
  sendEmailResetPasswordController,
  resetPasswordController,
} from "../controllers/users.controllers";
import ensureDataIsValid from "../middlewares/jwt/ensureDataIsValid.middleware";
import checkUniqueMail from "../middlewares/users/checkUniqueEmail.middleware";
import ensureIdExistMiddleware from "../middlewares/users/ensureIdExist.middleware";
import verifyTokenMiddleware from "../middlewares/jwt/ensureTokenIsValid.middleware";
import { userSchemaRequest, userSchemaUpdate } from "../schemas/users.schemas";
import checkOwnershipMiddleware from "../middlewares/users/checkOwnership.middleware";

const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  ensureDataIsValid(userSchemaRequest),
  checkUniqueMail,
  createUserController
);

usersRoutes.get("", readUsersController);

usersRoutes.get("/:id", ensureIdExistMiddleware, readUserByIdController);

usersRoutes.post("/resetPassword", sendEmailResetPasswordController);

usersRoutes.patch("/resetPassword/:token", resetPasswordController);

usersRoutes.use(verifyTokenMiddleware);

usersRoutes.patch(
  "/:id",
  ensureDataIsValid(userSchemaUpdate),
  ensureIdExistMiddleware,
  checkOwnershipMiddleware,
  updateUserController
);

usersRoutes.delete(
  "/:id",
  ensureIdExistMiddleware,
  checkOwnershipMiddleware,
  deleteUserController
);

export default usersRoutes;
