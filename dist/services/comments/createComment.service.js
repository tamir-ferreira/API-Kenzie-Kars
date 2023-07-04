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
const users_entity_1 = require("../../entities/users.entity");
const data_source_1 = require("../../data-source");
const adverts_entity_1 = require("../../entities/adverts.entity");
const errors_1 = require("../../errors");
const comments_entity_1 = require("../../entities/comments.entity");
const createCommentService = (id, queryParam, data) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(users_entity_1.User);
    const advertRepository = data_source_1.AppDataSource.getRepository(adverts_entity_1.Advert);
    const commentRepository = data_source_1.AppDataSource.getRepository(comments_entity_1.Comment);
    const foundUser = yield userRepository.findOne({
        where: {
            id: id,
        },
    });
    if (!foundUser) {
        throw new errors_1.AppError("Usuário não encontrado", 404);
    }
    const foundAdvert = yield advertRepository.findOne({
        where: {
            id: Number(queryParam),
        },
    });
    if (!foundAdvert) {
        throw new errors_1.AppError("Anúncio não encontrado", 404);
    }
    const commentResult = yield commentRepository
        .createQueryBuilder()
        .insert()
        .into(comments_entity_1.Comment)
        .values(Object.assign(Object.assign({}, data), { user: foundUser, advert: foundAdvert }))
        .returning("*")
        .execute();
    const insertedComment = commentResult.raw[0];
    return insertedComment;
});
exports.default = createCommentService;
