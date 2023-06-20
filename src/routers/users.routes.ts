import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listUserByIdController,
  listUsersController,
  updateUserController,
  sendEmailResetPasswordController,
  resetPasswordController,
} from "../controllers/users.controllers";
import ensureDataIsValid from "../middlewares/ensureDataIsValid.middleware";
import { userSchemaRequest, userSchemaUpdate } from "../schemas/users.schemas";
import checkUniqueMail from "../middlewares/users/checkUniqueEmail.middleware";
import { ensureIdExistMiddleware } from "../middlewares/ensureIdExist.middleware";
import { verifyTokenMiddleware } from "../middlewares/ensureTokenIsValid.middleware";

const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  ensureDataIsValid(userSchemaRequest),
  checkUniqueMail,
  createUserController
);

usersRoutes.get("", listUsersController);

usersRoutes.get("/:id", ensureIdExistMiddleware, listUserByIdController);

usersRoutes.post("/resetPassword", sendEmailResetPasswordController);

usersRoutes.patch("/resetPassword/:token", resetPasswordController);

usersRoutes.use(verifyTokenMiddleware);

usersRoutes.patch(
  "/:id",
  ensureDataIsValid(userSchemaUpdate),
  ensureIdExistMiddleware,
  updateUserController
);

usersRoutes.delete("/:id", ensureIdExistMiddleware, deleteUserController);

export default usersRoutes;
