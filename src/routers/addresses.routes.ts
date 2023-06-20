import { Router } from "express";
import { verifyTokenMiddleware } from "../middlewares/ensureTokenIsValid.middleware";
import { updateAddressController } from "../controllers/address.controllers";
import { updateAddressSchema } from "../schemas/addresses.schema";
import ensureDataIsValid from "../middlewares/ensureDataIsValid.middleware";
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
