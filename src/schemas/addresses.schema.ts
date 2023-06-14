import { z } from "zod";

export const requestAddressSchema = z.object({
  neighborhood: z.string(),
  zipCode: z.string().max(8),
  number: z.number(),
  city: z.string(),
  state: z.string().max(2),
});

export const returnAddressSchema = requestAddressSchema.extend({
  id: z.number(),
});
