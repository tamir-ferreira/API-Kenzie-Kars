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
const adverts_entity_1 = require("../../entities/adverts.entity");
const errors_1 = require("../../errors");
const readAdvertByIdUserService = (id, query) => __awaiter(void 0, void 0, void 0, function* () {
    const advertRepository = data_source_1.AppDataSource.getRepository(adverts_entity_1.Advert);
    let page = +query.page || 1;
    let perPage = +query.perPage || 9;
    if (page < 0) {
        page = 1;
    }
    if (perPage < 0) {
        perPage = 9;
    }
    const advert = yield advertRepository.find({
        where: {
            user: {
                id: id,
            },
        },
        relations: {
            user: true,
            comments: true,
        },
        take: perPage,
        skip: perPage * (page - 1),
    });
    const advertUnique = yield advertRepository.find({
        where: {
            user: {
                id: id,
            },
        },
        relations: {
            user: true,
            comments: true,
        },
    });
    if (!advert) {
        throw new errors_1.AppError("Anúncio não encontrado", 404);
    }
    const result = {
        prevPage: page === undefined || page === 1
            ? null
            : `http://localhost:3000/adverts/user?page=${page - 1}&perPage=${perPage}`,
        nextPage: advertUnique.length <= advert.length + perPage * (page - 1)
            ? null
            : `http://localhost:3000/adverts/user?page=${page + 1}&perPage=${perPage}`,
        data: advert,
    };
    return result;
});
exports.default = readAdvertByIdUserService;
