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
const adverts_schemas_1 = require("../../schemas/adverts.schemas");
const adverts_entity_1 = require("../../entities/adverts.entity");
const errors_1 = require("../../errors");
const readAdvertByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const advertRepository = data_source_1.AppDataSource.getRepository(adverts_entity_1.Advert);
    const advert = yield advertRepository.findOne({
        where: { id: id },
        relations: {
            user: true,
            comments: true,
        },
    });
    if (!advert) {
        throw new errors_1.AppError("Anúncio não encontrado", 404);
    }
    return adverts_schemas_1.advertSchema.parse(advert);
});
exports.default = readAdvertByIdService;
