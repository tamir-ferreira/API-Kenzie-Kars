import { z } from 'zod';

const advertSchema = z.object({
  id: z.number(),
  title: z.string().max(150),
  description: z.string().optional().nullish(),
  price: z.string().or(z.number()),
  createdAt: z.string(),
  updatedAt: z.string(),
  brand: z.string().max(40),
  model: z.string().max(40),
  year: z.number(),
  fuel: z.string().max(10),
  is_active: z.boolean().optional(),
});

const advertSchemaRequest = advertSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

const advertSchemaMultiple = z.array(advertSchema);

const advertSchemaUpdate = advertSchemaRequest.partial();

export {
  advertSchema,
  advertSchemaRequest,
  advertSchemaMultiple,
  advertSchemaUpdate,
};
