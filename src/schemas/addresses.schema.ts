import { z } from "zod";

export const requestAddressSchema = z.object({
  street: z.string(),
  complement: z.string().nullish().optional(),
  zipCode: z.string().min(8).max(8),
  number: z.number().nullish().optional(),
  city: z.string(),
  state: z.string().max(2),
});

export const returnAddressSchema = requestAddressSchema.extend({
  id: z.number(),
});
