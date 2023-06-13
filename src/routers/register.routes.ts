import { Router } from "express";
import { createUserController } from "../controllers/users.controllers";
import ensureDataIsValid from "../middlewares/ensureDataIsValid.middleware";
import { userSchemaRequest } from "../schemas/users.schemas";

const registerRoutes: Router = Router();

registerRoutes.post(
  "",
  ensureDataIsValid(userSchemaRequest),
  createUserController
);

export default registerRoutes;
