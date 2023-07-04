import { z } from "zod";
import { DeepPartial } from "typeorm";
import {
  advertSchema,
  advertSchemaMultiple,
  advertSchemaRequest,
} from "../schemas/adverts.schemas";

export type tAdvert = z.infer<typeof advertSchema>;
export type tAdvertRequest = z.infer<typeof advertSchemaRequest>;
export type tAdvertMultiple = z.infer<typeof advertSchemaMultiple>;
export type tAdvertUpdate = DeepPartial<tAdvertRequest>;

export interface iResMultipleAdverts {
  prevPage: string | null;
  nextPage: string | null;
  data: tAdvertMultiple;
}
