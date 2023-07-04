import { z } from "zod";

export const imagesSchema = z.object({
  image_link_one: z.string().optional().nullish(),
  image_link_two: z.string().optional().nullish(),
  image_link_three: z.string().optional().nullish(),
  image_link_four: z.string().optional().nullish(),
  image_link_five: z.string().optional().nullish(),
  image_link_six: z.string().optional().nullish(),
});

export const returnImagesSchema = imagesSchema.extend({
  id: z.number(),
});
