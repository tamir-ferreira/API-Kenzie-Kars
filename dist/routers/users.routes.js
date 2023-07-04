"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controllers_1 = require("../controllers/users.controllers");
const ensureDataIsValid_middleware_1 = __importDefault(require("../middlewares/jwt/ensureDataIsValid.middleware"));
const checkUniqueEmail_middleware_1 = __importDefault(require("../middlewares/users/checkUniqueEmail.middleware"));
const ensureIdExist_middleware_1 = __importDefault(require("../middlewares/users/ensureIdExist.middleware"));
const ensureTokenIsValid_middleware_1 = __importDefault(require("../middlewares/jwt/ensureTokenIsValid.middleware"));
const users_schemas_1 = require("../schemas/users.schemas");
const checkOwnership_middleware_1 = __importDefault(require("../middlewares/users/checkOwnership.middleware"));
const usersRoutes = (0, express_1.Router)();
usersRoutes.post("", (0, ensureDataIsValid_middleware_1.default)(users_schemas_1.userSchemaRequest), checkUniqueEmail_middleware_1.default, users_controllers_1.createUserController);
usersRoutes.get("", users_controllers_1.readUsersController);
usersRoutes.get("/:id", ensureIdExist_middleware_1.default, users_controllers_1.readUserByIdController);
usersRoutes.post("/resetPassword", users_controllers_1.sendEmailResetPasswordController);
usersRoutes.patch("/resetPassword/:token", users_controllers_1.resetPasswordController);
usersRoutes.use(ensureTokenIsValid_middleware_1.default);
usersRoutes.patch("/:id", (0, ensureDataIsValid_middleware_1.default)(users_schemas_1.userSchemaUpdate), ensureIdExist_middleware_1.default, checkOwnership_middleware_1.default, users_controllers_1.updateUserController);
usersRoutes.delete("/:id", ensureIdExist_middleware_1.default, checkOwnership_middleware_1.default, users_controllers_1.deleteUserController);
exports.default = usersRoutes;
