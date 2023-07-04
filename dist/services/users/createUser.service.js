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
const users_schemas_1 = require("../../schemas/users.schemas");
const addresses_entity_1 = require("../../entities/addresses.entity");
const addresses_schemas_1 = require("../../schemas/addresses.schemas");
const createUserService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(users_entity_1.User);
    const addressRepository = data_source_1.AppDataSource.getRepository(addresses_entity_1.Address);
    const dataAddress = userData.address;
    const createAddress = addressRepository.create(dataAddress);
    yield addressRepository.save(createAddress);
    const newAddress = addresses_schemas_1.returnAddressSchema.parse(createAddress);
    const findAddress = yield addressRepository.findOneBy({
        id: newAddress.id,
    });
    const userColor = "#" +
        Math.floor(Math.random() * 0x1000000)
            .toString(16)
            .padStart(6, "0");
    const user = userRepository.create(Object.assign(Object.assign({}, userData), { address: findAddress, color: userColor }));
    yield userRepository.save(user);
    const userReturn = users_schemas_1.userSchemaResponse.parse(user);
    return userReturn;
});
exports.default = createUserService;
