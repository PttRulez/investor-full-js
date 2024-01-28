import { z } from "zod";
import { Role } from "../other/enums";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const RegisterSchema = LoginSchema.extend({
  name: z.string(),
  role: z.nativeEnum(Role).optional(),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
