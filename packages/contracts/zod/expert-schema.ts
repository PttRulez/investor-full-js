import { z } from "zod";

export const CreateExpertSchema = z.object({
  avatarUrl: z.string().optional(),
  name: z
    .string({
      errorMap: (issue) => ({
        message: "Введите имя эксперта",
      }),
    })
    .trim()
    .min(1, "Введите имя эксперта"),
});

export const UpdateExpertSchema = CreateExpertSchema.partial().extend({
  id: z.number(),
});

export type CreateExpert = z.infer<typeof CreateExpertSchema>;
export type UpdateExpert = z.infer<typeof UpdateExpertSchema>;
