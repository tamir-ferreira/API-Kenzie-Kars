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
const ensureAdvertExistsMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const advertRepository = data_source_1.AppDataSource.getRepository(adverts_entity_1.Advert);
    const id = Number(req.params.id);
    const advert = yield advertRepository.findOne({
        where: {
            id: id,
        },
        relations: {
            user: true,
            comments: true,
        },
    });
    if (!advert) {
        return res.status(404).json({
            message: "Anúncio não encontrado",
        });
    }
    else {
        res.locals.advert = advert;
        return next();
    }
});
exports.default = ensureAdvertExistsMiddleware;
