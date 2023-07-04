"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchemaResponsePartial = exports.userSchemaUpdate = exports.multipleUserSchemaResponse = exports.userSchemaResponse = exports.userSchemaRequest = exports.userIdSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
const addresses_schemas_1 = require("./addresses.schemas");
exports.userSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    phone: zod_1.z.string(),
    cpf: zod_1.z.string().min(11).max(14),
    birthdate: zod_1.z.string(),
    description: zod_1.z.string().nullish().optional(),
    password: zod_1.z.string(),
    admin: zod_1.z.boolean().optional().default(false),
    seller: zod_1.z.boolean().optional().default(false),
    color: zod_1.z.string(),
    reset_token: zod_1.z.string().nullish().optional(),
    createdAt: zod_1.z.string().or(zod_1.z.date()),
    updatedAt: zod_1.z.string().or(zod_1.z.date()),
    address: addresses_schemas_1.requestAddressSchema.nullish(),
});
exports.userIdSchema = zod_1.z.object({
    id: zod_1.z.number(),
});
exports.userSchemaRequest = exports.userSchema.omit({
    id: true,
    color: true,
    reset_token: true,
    createdAt: true,
    updatedAt: true,
});
exports.userSchemaResponse = exports.userSchema
    .omit({
    password: true,
})
    .extend({
    address: addresses_schemas_1.returnAddressSchema.nullish(),
});
exports.multipleUserSchemaResponse = zod_1.z.array(exports.userSchemaResponse);
exports.userSchemaUpdate = exports.userSchemaRequest
    .extend({ address: addresses_schemas_1.updateAddressSchema.nullish() })
    .partial();
exports.userSchemaResponsePartial = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
});
