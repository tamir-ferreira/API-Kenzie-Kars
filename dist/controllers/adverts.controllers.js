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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAdvertController = exports.updateAdvertController = exports.readAdvertByIdUserController = exports.readAdvertByIdController = exports.readAdvertsController = exports.createAdvertController = void 0;
const createAdvert_service_1 = __importDefault(require("../services/adverts/createAdvert.service"));
const readAdverts_service_1 = __importDefault(require("../services/adverts/readAdverts.service"));
const updateAdvert_service_1 = __importDefault(require("../services/adverts/updateAdvert.service"));
const deleteAdvert_service_1 = __importDefault(require("../services/adverts/deleteAdvert.service"));
const readAdvertById_service_1 = __importDefault(require("../services/adverts/readAdvertById.service"));
const readAdvertByIdUser_service_1 = __importDefault(require("../services/adverts/readAdvertByIdUser.service"));
const createAdvertController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const userId = res.locals.userId;
    const newAdvert = yield (0, createAdvert_service_1.default)(body, userId);
    return res.status(201).json(newAdvert);
});
exports.createAdvertController = createAdvertController;
const readAdvertsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const adverts = yield (0, readAdverts_service_1.default)(query);
    return res.status(200).json(adverts);
});
exports.readAdvertsController = readAdvertsController;
const readAdvertByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const advert = yield (0, readAdvertById_service_1.default)(id);
    return res.status(200).json(advert);
});
exports.readAdvertByIdController = readAdvertByIdController;
const readAdvertByIdUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const query = req.query;
    const advert = yield (0, readAdvertByIdUser_service_1.default)(id, query);
    return res.status(200).json(advert);
});
exports.readAdvertByIdUserController = readAdvertByIdUserController;
const updateAdvertController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const id = Number(req.params.id);
    const updatedAdvert = yield (0, updateAdvert_service_1.default)(body, id);
    return res.status(200).json(updatedAdvert);
});
exports.updateAdvertController = updateAdvertController;
const deleteAdvertController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    yield (0, deleteAdvert_service_1.default)(id);
    return res.status(204).json();
});
exports.deleteAdvertController = deleteAdvertController;
