import { z } from "zod";
import {
  multipleUserSchemaResponse,
  userSchemaRequest,
  userSchemaResponse,
} from "../schemas/users.schemas";

export type UserRequest = z.infer<typeof userSchemaRequest>;
export type UserResponse = z.infer<typeof userSchemaResponse>;
export type UserResponseMultiple = z.infer<typeof multipleUserSchemaResponse>;

export type LoginRequest = {
  email: string;
  password: string;
};
