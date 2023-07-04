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
exports.deleteCommentController = exports.updateCommentController = exports.listCommentByIdController = exports.listCommentsController = exports.createCommentController = void 0;
const createComment_service_1 = __importDefault(require("../services/comments/createComment.service"));
const readComments_service_1 = __importDefault(require("../services/comments/readComments.service"));
const readCommentById_service_1 = __importDefault(require("../services/comments/readCommentById.service"));
const deleteComment_service_1 = __importDefault(require("../services/comments/deleteComment.service"));
const updateComment_service_1 = __importDefault(require("../services/comments/updateComment.service"));
const createCommentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newComment = yield (0, createComment_service_1.default)(res.locals.userId, req.params.id, req.body);
    return res.status(201).json(newComment);
});
exports.createCommentController = createCommentController;
const listCommentsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const comments = yield (0, readComments_service_1.default)();
    return res.status(200).json(comments);
});
exports.listCommentsController = listCommentsController;
const listCommentByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield (0, readCommentById_service_1.default)(Number(req.params.id));
    return res.status(200).json(comment);
});
exports.listCommentByIdController = listCommentByIdController;
const updateCommentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedComment = yield (0, updateComment_service_1.default)(Number(req.params.id), req.body);
    return res.status(200).json(updatedComment);
});
exports.updateCommentController = updateCommentController;
const deleteCommentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, deleteComment_service_1.default)(Number(req.params.id));
    return res.status(204).json();
});
exports.deleteCommentController = deleteCommentController;
