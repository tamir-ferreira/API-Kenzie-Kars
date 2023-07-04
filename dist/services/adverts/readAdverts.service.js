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
const readAdvertsService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const advertRepository = data_source_1.AppDataSource.getRepository(adverts_entity_1.Advert);
    let adverts;
    let advertsQuant;
    let page = +query.page || 1;
    let perPage = +query.perPage || 9;
    const advertCount = yield advertRepository.count();
    if (page < 0) {
        page = 1;
    }
    if (perPage < 0) {
        perPage = 9;
    }
    if (query.brand == "" &&
        query.model == "" &&
        query.color == "" &&
        query.year == "" &&
        query.fuel == "" &&
        query.mileage == "" &&
        query.price == "") {
        adverts = yield advertRepository.find({
            where: {
                is_active: true,
            },
            relations: {
                user: true,
                comments: true,
                images: true,
            },
            order: {
                id: "ASC",
            },
            take: perPage,
            skip: perPage * (page - 1),
        });
    }
    else {
        adverts = yield advertRepository.find({
            relations: {
                user: true,
                comments: true,
                images: true,
            },
            where: {
                brand: query.brand !== "" ? query.brand : null,
                model: query.model !== "" ? query.model : null,
                color: query.color !== "" ? query.color : null,
                year: query.year !== "" ? query.year : null,
                fuel: query.fuel !== "" ? query.fuel : null,
                is_active: true,
            },
            order: {
                mileage: query.mileage !== "" ? query.mileage : undefined,
                price: query.price !== "" ? query.price : undefined,
            },
            take: perPage,
            skip: perPage * (page - 1),
        });
    }
    if (query.brand == "" &&
        query.model == "" &&
        query.color == "" &&
        query.year == "" &&
        query.fuel == "" &&
        query.mileage == "" &&
        query.price == "") {
        advertsQuant = yield advertRepository.find({
            where: {
                is_active: true,
            },
            relations: {
                user: true,
                comments: true,
                images: true,
            },
        });
    }
    else {
        advertsQuant = yield advertRepository.find({
            relations: {
                user: true,
                comments: true,
                images: true,
            },
            where: {
                brand: query.brand !== "" ? query.brand : null,
                model: query.model !== "" ? query.model : null,
                color: query.color !== "" ? query.color : null,
                year: query.year !== "" ? query.year : null,
                fuel: query.fuel !== "" ? query.fuel : null,
                is_active: true,
            },
        });
    }
    const result = {
        prevPage: page === undefined || page === 1
            ? null
            : `http://localhost:3000/adverts?page=${page - 1}&perPage=${perPage}&brand=${query.brand}&model=${query.model}&color=${query.color}&year=${query.year}&fuel=${query.fuel}&mileage=${query.mileage}&price=${query.price}`,
        nextPage: advertsQuant.length <= adverts.length + perPage * (page - 1)
            ? null
            : `http://localhost:3000/adverts?page=${page + 1}&perPage=${perPage}&brand=${query.brand}&model=${query.model}&color=${query.color}&year=${query.year}&fuel=${query.fuel}&mileage=${query.mileage}&price=${query.price}`,
        data: adverts,
    };
    return result;
});
exports.default = readAdvertsService;
