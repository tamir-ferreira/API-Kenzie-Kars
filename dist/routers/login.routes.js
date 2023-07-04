"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controllers_1 = require("../controllers/users.controllers");
const loginRoutes = (0, express_1.Router)();
loginRoutes.post("", users_controllers_1.loginController);
exports.default = loginRoutes;
