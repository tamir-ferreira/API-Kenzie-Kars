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
const images_entity_1 = require("../../entities/images.entity");
const updateAdvertService = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    const advertRepository = data_source_1.AppDataSource.getRepository(adverts_entity_1.Advert);
    const imageRepository = data_source_1.AppDataSource.getRepository(images_entity_1.Image);
    const oldData = yield advertRepository.findOne({
        relations: { images: true },
        where: { id: id },
    });
    const newImages = imageRepository.create(Object.assign(Object.assign({}, oldData.images), data.images));
    yield imageRepository.save(newImages);
    const advert = advertRepository.create(Object.assign(Object.assign(Object.assign({}, oldData), data), { images: newImages }));
    yield advertRepository.save(advert);
    const newAdvert = yield advertRepository.findOne({
        relations: {
            images: true,
        },
        where: {
            id: id,
        },
    });
    return adverts_schemas_1.advertSchema.parse(newAdvert);
});
exports.default = updateAdvertService;
