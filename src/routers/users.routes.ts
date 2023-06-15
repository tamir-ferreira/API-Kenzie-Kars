import { Router } from "express";
import {
  createUserController,
  listUsersController,
} from "../controllers/users.controllers";
import ensureDataIsValid from "../middlewares/ensureDataIsValid.middleware";
import { userSchemaRequest } from "../schemas/users.schemas";
import checkUniqueMail from "../middlewares/users/checkUniqueEmail.middleware";

const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  ensureDataIsValid(userSchemaRequest),
  checkUniqueMail,
  createUserController
);

usersRoutes.get("", listUsersController);

export default usersRoutes;
