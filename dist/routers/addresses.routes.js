"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const address_controllers_1 = require("../controllers/address.controllers");
const addresses_schemas_1 = require("../schemas/addresses.schemas");
const ensureTokenIsValid_middleware_1 = __importDefault(require("../middlewares/jwt/ensureTokenIsValid.middleware"));
const ensureDataIsValid_middleware_1 = __importDefault(require("../middlewares/jwt/ensureDataIsValid.middleware"));
const ensureAddressExists_middleware_1 = __importDefault(require("../middlewares/addresses/ensureAddressExists.middleware"));
const addressesRoutes = (0, express_1.Router)();
addressesRoutes.use(ensureTokenIsValid_middleware_1.default);
addressesRoutes.patch("/:id", (0, ensureDataIsValid_middleware_1.default)(addresses_schemas_1.updateAddressSchema), ensureAddressExists_middleware_1.default, address_controllers_1.updateAddressController);
exports.default = addressesRoutes;
