"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnImagesSchema = exports.imagesSchema = void 0;
const zod_1 = require("zod");
exports.imagesSchema = zod_1.z.object({
    image_link_one: zod_1.z.string().optional().nullish(),
    image_link_two: zod_1.z.string().optional().nullish(),
    image_link_three: zod_1.z.string().optional().nullish(),
    image_link_four: zod_1.z.string().optional().nullish(),
    image_link_five: zod_1.z.string().optional().nullish(),
    image_link_six: zod_1.z.string().optional().nullish(),
});
exports.returnImagesSchema = exports.imagesSchema.extend({
    id: zod_1.z.number(),
});
