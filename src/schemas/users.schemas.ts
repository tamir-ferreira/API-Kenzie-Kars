import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  password: z.string(),
  admin: z.boolean().optional().default(false),
  seller: z.boolean().optional().default(false),
  color: z.string(),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
});

export const userSchemaRequest = userSchema.omit({
  id: true,
  color: true,
  createdAt: true,
  updatedAt: true,
});

export const userSchemaResponse = userSchema.omit({
  password: true,
});
