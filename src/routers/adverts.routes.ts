import { Router } from "express";
import {
  advertSchemaRequest,
  advertSchemaUpdate,
} from "../schemas/adverts.schemas";
import {
  createAdvertController,
  deleteAdvertController,
  readAdvertsController,
  updateAdvertController,
} from "../controllers/adverts.controllers";
import ensureDataIsValid from "../middlewares/ensureDataIsValid.middleware";
import ensureAdvertExists from "../middlewares/adverts/ensureAdvertExists.middleware";
import { verifyTokenMiddleware } from "../middlewares/ensureTokenIsValid.middleware";

const advertsRoutes = Router();

advertsRoutes.use(verifyTokenMiddleware);

advertsRoutes.post(
  "",
  verifyTokenMiddleware,
  ensureDataIsValid(advertSchemaRequest),
  createAdvertController
);

advertsRoutes.get("", readAdvertsController);

advertsRoutes.patch(
  "/:id",
  ensureDataIsValid(advertSchemaUpdate),
  ensureAdvertExists,
  updateAdvertController
);

advertsRoutes.delete("/:id", ensureAdvertExists, deleteAdvertController);

export default advertsRoutes;
