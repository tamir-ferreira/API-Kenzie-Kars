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
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../errors");
const checkAdvertOwnershipMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const loggedUser = Number(res.locals.userId);
    const advert = res.locals.advert;
    if (advert.user.id !== loggedUser) {
        throw new errors_1.AppError("Você não possui permissão", 403);
    }
    return next();
});
exports.default = checkAdvertOwnershipMiddleware;
