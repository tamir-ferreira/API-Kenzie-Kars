import { Router } from "express";
import {
  advertSchemaRequest,
  advertSchemaUpdate,
} from "../schemas/adverts.schemas";
import {
  createAdvertController,
  deleteAdvertController,
  readAdvertByIdController,
  readAdvertsController,
  updateAdvertController,
} from "../controllers/adverts.controllers";
import ensureAdvertExists from "../middlewares/adverts/ensureAdvertExists.middleware";
import verifyTokenMiddleware from "../middlewares/jwt/ensureTokenIsValid.middleware";
import ensureDataIsValidMiddleware from "../middlewares/jwt/ensureDataIsValid.middleware";
import checkAdvertOwnershipMiddleware from "../middlewares/adverts/checkAdvertOwnership.middleware";

const advertsRoutes = Router();

advertsRoutes.get("", readAdvertsController);

advertsRoutes.get("/:id", readAdvertByIdController);

advertsRoutes.use(verifyTokenMiddleware);

advertsRoutes.post(
  "",
  verifyTokenMiddleware,
  ensureDataIsValidMiddleware(advertSchemaRequest),
  createAdvertController
);

advertsRoutes.patch(
  "/:id",
  ensureDataIsValidMiddleware(advertSchemaUpdate),
  ensureAdvertExists,
  checkAdvertOwnershipMiddleware,
  updateAdvertController
);

advertsRoutes.delete(
  "/:id",
  ensureAdvertExists,
  checkAdvertOwnershipMiddleware,
  deleteAdvertController
);

export default advertsRoutes;
