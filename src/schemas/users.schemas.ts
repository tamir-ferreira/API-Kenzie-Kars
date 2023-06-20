import { z } from "zod";
import { requestAddressSchema, updateAddressSchema } from "./addresses.schema";

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  cpf: z.string().min(11).max(14),
  birthdate: z.string(),
  description: z.string().nullish().optional(),
  password: z.string(),
  admin: z.boolean().optional().default(false),
  seller: z.boolean().optional().default(false),
  color: z.string(),
  reset_token: z.string().nullish().optional(),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
  address: requestAddressSchema.nullish(),
});

export const userIdSchema = z.object({
  id: z.number(),
});

export const userSchemaRequest = userSchema.omit({
  id: true,
  color: true,
  reset_token: true,
  createdAt: true,
  updatedAt: true,
});

export const userSchemaResponse = userSchema.omit({
  password: true,
});

export const multipleUserSchemaResponse = z.array(userSchemaResponse);

export const userSchemaUpdate = userSchemaRequest
  .extend({ address: updateAddressSchema.nullish() })
  .partial();
