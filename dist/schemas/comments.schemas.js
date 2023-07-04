"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentSchemaResponse = exports.commentSchemaUpdate = exports.commentSchemaMultiple = exports.commentSchemaRequest = exports.commentSchema = void 0;
const zod_1 = require("zod");
const users_schemas_1 = require("./users.schemas");
const adverts_schemas_1 = require("./adverts.schemas");
exports.commentSchema = zod_1.z.object({
    id: zod_1.z.number(),
    title: zod_1.z.string().max(200),
    content: zod_1.z.string(),
    createdAt: zod_1.z.string(),
    user: users_schemas_1.userSchemaResponsePartial,
    advert: adverts_schemas_1.advertSchemaResponsePartial,
});
exports.commentSchemaRequest = exports.commentSchema.omit({
    id: true,
    createdAt: true,
    user: true,
    advert: true,
});
exports.commentSchemaMultiple = zod_1.z.array(exports.commentSchema);
exports.commentSchemaUpdate = exports.commentSchemaRequest.partial();
exports.commentSchemaResponse = zod_1.z.object({
    id: zod_1.z.number(),
    title: zod_1.z.string().max(200),
    content: zod_1.z.string(),
    createdAt: zod_1.z.string(),
});
