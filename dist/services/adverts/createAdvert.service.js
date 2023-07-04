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
const users_entity_1 = require("../../entities/users.entity");
const images_entity_1 = require("../../entities/images.entity");
const images_schemas_1 = require("../../schemas/images.schemas");
const createAdvertService = (data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const advertRepository = data_source_1.AppDataSource.getRepository(adverts_entity_1.Advert);
    const userRepository = data_source_1.AppDataSource.getRepository(users_entity_1.User);
    const imageRepository = data_source_1.AppDataSource.getRepository(images_entity_1.Image);
    const imageObj = data.images;
    if (imageObj !== undefined && imageObj !== null) {
        imageRepository.create(imageObj);
        yield imageRepository.save(imageObj);
        const newGallery = images_schemas_1.returnImagesSchema.parse(imageObj);
        const user = yield userRepository.findOne({
            where: {
                id: userId,
            },
        });
        const gallery = yield imageRepository.findOne({
            where: {
                id: newGallery.id,
            },
        });
        const advert = advertRepository.create(Object.assign(Object.assign({}, data), { user: user, images: gallery }));
        yield advertRepository.save(advert);
        return adverts_schemas_1.advertSchema.parse(advert);
    }
    else {
        const user = yield userRepository.findOne({
            where: {
                id: userId,
            },
        });
        const advert = advertRepository.create(Object.assign(Object.assign({}, data), { user: user, images: null }));
        yield advertRepository.save(advert);
        return adverts_schemas_1.advertSchema.parse(advert);
    }
});
exports.default = createAdvertService;
