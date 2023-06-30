import { z } from "zod";
import { imagesSchema, returnImagesSchema } from "../schemas/images.schemas";

export type tImages = z.infer<typeof imagesSchema>;
export type tReturnImages = z.infer<typeof returnImagesSchema>;
