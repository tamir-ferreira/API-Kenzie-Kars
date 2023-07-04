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
exports.resetPasswordController = exports.sendEmailResetPasswordController = exports.loginController = exports.deleteUserController = exports.updateUserController = exports.readUserByIdController = exports.readUsersController = exports.createUserController = void 0;
const createUser_service_1 = __importDefault(require("../services/users/createUser.service"));
const login_service_1 = __importDefault(require("../services/login/login.service"));
const readUsers_service_1 = __importDefault(require("../services/users/readUsers.service"));
const readUserById_service_1 = __importDefault(require("../services/users/readUserById.service"));
const updateUser_service_1 = __importDefault(require("../services/users/updateUser.service"));
const deleteUser_service_1 = __importDefault(require("../services/users/deleteUser.service"));
const sendEmailResetPassword_service_1 = __importDefault(require("../services/resetPassword/sendEmailResetPassword.service"));
const resetPassword_service_1 = __importDefault(require("../services/resetPassword/resetPassword.service"));
const createUserController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = request.body;
    const newUser = yield (0, createUser_service_1.default)(userData);
    return response.status(201).json(newUser);
});
exports.createUserController = createUserController;
const readUsersController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, readUsers_service_1.default)();
    return response.status(200).json(users);
});
exports.readUsersController = readUsersController;
const readUserByIdController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const idUser = parseInt(request.params.id);
    const user = yield (0, readUserById_service_1.default)(idUser);
    return response.status(200).json(user);
});
exports.readUserByIdController = readUserByIdController;
const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const id = Number(req.params.id);
    const updatedUser = yield (0, updateUser_service_1.default)(body, id);
    return res.status(200).json(updatedUser);
});
exports.updateUserController = updateUserController;
const deleteUserController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const idUser = parseInt(request.params.id);
    yield (0, deleteUser_service_1.default)(idUser);
    return response.status(204).json();
});
exports.deleteUserController = deleteUserController;
const loginController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const loginData = request.body;
    const token = yield (0, login_service_1.default)(loginData);
    return response.json({ token });
});
exports.loginController = loginController;
const sendEmailResetPasswordController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    yield (0, sendEmailResetPassword_service_1.default)(email);
    return res.json({ message: "token enviado" });
});
exports.sendEmailResetPasswordController = sendEmailResetPasswordController;
const resetPasswordController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = req.body;
    const { token } = req.params;
    yield (0, resetPassword_service_1.default)(password, token);
    return res.json({ message: "senha alterada com sucesso" });
});
exports.resetPasswordController = resetPasswordController;
