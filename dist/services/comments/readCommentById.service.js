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
const data_source_1 = require("../../data-source");
const comments_entity_1 = require("../../entities/comments.entity");
const errors_1 = require("../../errors");
const readCommentByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const commentRepository = data_source_1.AppDataSource.getRepository(comments_entity_1.Comment);
    const findComment = yield commentRepository.findOne({
        where: { id: id },
        relations: { user: true, advert: true },
    });
    if (!findComment) {
        throw new errors_1.AppError("Comentário não encontrado", 404);
    }
    const comment = yield commentRepository
        .createQueryBuilder("comments")
        .select(["comments", "users.id", "users.name", "users.email", "adverts.id"])
        .innerJoin("comments.user", "users")
        .innerJoin("comments.advert", "adverts")
        .where("comments.id = :id", { id: id })
        .getOne();
    if (!comment) {
        throw new errors_1.AppError("Comentário não encontrado", 404);
    }
    return comment;
});
exports.default = readCommentByIdService;
