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
const ensureCommentExistsMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const commentRepository = data_source_1.AppDataSource.getRepository(comments_entity_1.Comment);
    const id = Number(req.params.id);
    const comment = yield commentRepository.findOne({
        where: {
            id: id,
        },
        relations: {
            user: true,
            advert: true,
        },
    });
    if (!comment) {
        return res.status(404).json({
            message: "Comentário não encontrado",
        });
    }
    else {
        res.locals.comment = comment;
        return next();
    }
});
exports.default = ensureCommentExistsMiddleware;
