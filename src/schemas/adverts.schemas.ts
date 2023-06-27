import { z } from "zod";
import { userSchemaResponse } from "./users.schemas";
import { commentSchemaResponse } from "./comments.schemas";

export const advertSchema = z.object({
  id: z.number(),
  brand: z.string().max(40),
  model: z.string().max(40),
  year: z.number(),
  fuel: z.string().max(10),
  mileage: z.number(),
  color: z.string().max(20),
  fipe_price: z.number().or(z.string()),
  price: z.number().or(z.string()),
  description: z.string(),
  cover_image: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  is_active: z.boolean().optional().default(true),
  user: userSchemaResponse.nullish(),
  comments: commentSchemaResponse.array().nullish(),
});

export const advertSchemaRequest = advertSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  user: true,
  comments: true,
});

export const advertSchemaMultiple = advertSchema.array();

export const advertSchemaUpdate = advertSchemaRequest.partial();

export const advertSchemaResponsePartial = z.object({ id: z.number() });
