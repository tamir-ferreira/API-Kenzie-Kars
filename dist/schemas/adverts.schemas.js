"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.advertSchemaResponsePartial = exports.advertSchemaUpdate = exports.advertSchemaMultiple = exports.advertSchemaRequest = exports.advertSchema = void 0;
const zod_1 = require("zod");
const users_schemas_1 = require("./users.schemas");
const comments_schemas_1 = require("./comments.schemas");
const images_schemas_1 = require("./images.schemas");
exports.advertSchema = zod_1.z.object({
    id: zod_1.z.number(),
    brand: zod_1.z.string().max(40),
    model: zod_1.z.string().max(40),
    year: zod_1.z.number(),
    fuel: zod_1.z.string().max(10),
    mileage: zod_1.z.number(),
    color: zod_1.z.string().max(20),
    fipe_price: zod_1.z.number().or(zod_1.z.string()),
    price: zod_1.z.number().or(zod_1.z.string()),
    description: zod_1.z.string(),
    cover_image: zod_1.z.string(),
    createdAt: zod_1.z.string(),
    updatedAt: zod_1.z.string(),
    is_active: zod_1.z.boolean().optional().default(true),
    user: users_schemas_1.userSchemaResponse.nullish(),
    comments: comments_schemas_1.commentSchemaResponse.array().nullish(),
    images: images_schemas_1.returnImagesSchema.optional().nullish(),
});
exports.advertSchemaRequest = exports.advertSchema
    .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    user: true,
    comments: true,
})
    .extend({
    images: images_schemas_1.imagesSchema.optional().nullish(),
});
exports.advertSchemaMultiple = exports.advertSchema.array();
exports.advertSchemaUpdate = exports.advertSchemaRequest.partial();
exports.advertSchemaResponsePartial = zod_1.z.object({ id: zod_1.z.number() });
