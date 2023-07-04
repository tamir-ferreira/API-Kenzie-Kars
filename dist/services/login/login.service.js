"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_entity_1 = require("../../entities/users.entity");
const data_source_1 = require("../../data-source");
const errors_1 = require("../../errors");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const loginService = (loginData) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(users_entity_1.User);
    const user = yield userRepository.findOne({
        where: {
            email: loginData.email,
        },
    });
    if (!user) {
        throw new errors_1.AppError("Wrong email or password", 401);
    }
    const verifyPassword = yield (0, bcryptjs_1.compare)(loginData.password, user.password);
    if (!verifyPassword) {
        throw new errors_1.AppError("Wrong email or password", 401);
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id }, String(process.env.SECRET_KEY), {
        expiresIn: process.env.EXPIRES_IN,
        subject: String(user.id),
    });
    return token;
});
exports.default = loginService;
