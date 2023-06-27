import { Router } from "express";
import { updateAddressController } from "../controllers/address.controllers";
import { updateAddressSchema } from "../schemas/addresses.schemas";
import verifyTokenMiddleware from "../middlewares/jwt/ensureTokenIsValid.middleware";
import ensureDataIsValid from "../middlewares/jwt/ensureDataIsValid.middleware";
import ensureAddressExists from "../middlewares/addresses/ensureAddressExists.middleware";

const addressesRoutes = Router();

addressesRoutes.use(verifyTokenMiddleware);

addressesRoutes.patch(
  "/:id",
  ensureDataIsValid(updateAddressSchema),
  ensureAddressExists,
  updateAddressController
);

export default addressesRoutes;
