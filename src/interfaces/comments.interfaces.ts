import { z } from "zod";
import { DeepPartial } from "typeorm";
import {
  commentSchema,
  commentSchemaMultiple,
  commentSchemaRequest,
} from "../schemas/comments.schemas";

export type tCommentResponse = z.infer<typeof commentSchema>;
export type tCommentRequest = z.infer<typeof commentSchemaRequest>;
export type tCommentResponseMultiple = z.infer<typeof commentSchemaMultiple>;
export type tCommentUpdate = DeepPartial<tCommentRequest>;
