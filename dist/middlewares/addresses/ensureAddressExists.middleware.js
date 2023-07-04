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
exports.ensureAddressExistsMiddleware = void 0;
const data_source_1 = require("../../data-source");
const addresses_entity_1 = require("../../entities/addresses.entity");
const ensureAddressExistsMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const addressRepository = data_source_1.AppDataSource.getRepository(addresses_entity_1.Address);
    const id = Number(req.params.id);
    const address = yield addressRepository.findOne({
        where: {
            id: id,
        },
    });
    if (!address) {
        return res.status(404).json({
            message: "Address not found",
        });
    }
    return next();
});
exports.ensureAddressExistsMiddleware = ensureAddressExistsMiddleware;
exports.default = exports.ensureAddressExistsMiddleware;
