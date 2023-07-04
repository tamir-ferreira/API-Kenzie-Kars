"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAddressSchema = exports.returnAddressSchema = exports.requestAddressSchema = void 0;
const zod_1 = require("zod");
exports.requestAddressSchema = zod_1.z.object({
    street: zod_1.z.string(),
    complement: zod_1.z.string().nullish().optional(),
    zipCode: zod_1.z.string().min(8).max(8),
    number: zod_1.z.number().nullish().optional(),
    city: zod_1.z.string(),
    state: zod_1.z.string().max(2),
});
exports.returnAddressSchema = exports.requestAddressSchema.extend({
    id: zod_1.z.number(),
});
exports.updateAddressSchema = exports.returnAddressSchema.partial();
