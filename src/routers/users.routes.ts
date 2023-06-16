import { Router } from "express";
import {
  createUserController,
  listUserByIdController,
  listUsersController,
} from "../controllers/users.controllers";
import ensureDataIsValid from "../middlewares/ensureDataIsValid.middleware";
import { userSchemaRequest } from "../schemas/users.schemas";
import checkUniqueMail from "../middlewares/users/checkUniqueEmail.middleware";
import { ensureIdExistMiddleware } from "../middlewares/ensureIdExist.middleware";

const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  ensureDataIsValid(userSchemaRequest),
  checkUniqueMail,
  createUserController
);

usersRoutes.get("", listUsersController);

usersRoutes.get("/:id", ensureIdExistMiddleware, listUserByIdController);

export default usersRoutes;
