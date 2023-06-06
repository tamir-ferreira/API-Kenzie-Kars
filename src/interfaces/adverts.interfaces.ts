import { z } from 'zod';
import { DeepPartial } from 'typeorm';
import {
  advertSchema,
  advertSchemaMultiple,
  advertSchemaRequest,
} from '../schemas/adverts.schemas';

type tAdvert = z.infer<typeof advertSchema>;
type tAdvertRequest = z.infer<typeof advertSchemaRequest>;
type tAdvertMultiple = z.infer<typeof advertSchemaMultiple>;
type tAdvertUpdate = DeepPartial<tAdvertRequest>;

export { tAdvert, tAdvertRequest, tAdvertMultiple, tAdvertUpdate };
