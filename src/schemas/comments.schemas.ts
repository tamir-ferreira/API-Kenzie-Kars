import { z } from "zod";
import { userSchemaResponsePartial } from "./users.schemas";
import { advertSchemaResponsePartial } from "./adverts.schemas";

export const commentSchema = z.object({
  id: z.number(),
  title: z.string().max(200),
  content: z.string(),
  createdAt: z.string(),
  user: userSchemaResponsePartial,
  advert: advertSchemaResponsePartial,
});

export const commentSchemaRequest = commentSchema.omit({
  id: true,
  createdAt: true,
  user: true,
  advert: true,
});

export const commentSchemaMultiple = z.array(commentSchema);

export const commentSchemaUpdate = commentSchemaRequest.partial();

export const commentSchemaResponse = z.object({
  id: z.number(),
  title: z.string().max(200),
  content: z.string(),
  createdAt: z.string(),
});
