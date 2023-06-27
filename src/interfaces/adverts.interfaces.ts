import { z } from "zod";
import { DeepPartial } from "typeorm";
import {
  advertSchema,
  advertSchemaMultiple,
  advertSchemaRequest,
  // advertSchemaResWithComment,
} from "../schemas/adverts.schemas";

export type tAdvert = z.infer<typeof advertSchema>;
export type tAdvertRequest = z.infer<typeof advertSchemaRequest>;
export type tAdvertMultiple = z.infer<typeof advertSchemaMultiple>;
export type tAdvertUpdate = DeepPartial<tAdvertRequest>;
// export type tAdvertResWithComment = z.infer<typeof advertSchemaResWithComment>;
// export type tAdvertMultipleWithComment = z.infer<typeof advertSchemaMultiple>;
