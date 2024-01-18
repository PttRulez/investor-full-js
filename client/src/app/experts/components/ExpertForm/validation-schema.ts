import { zodSchemaForType } from '@/utils/zod';
import { CreateExpertDto } from '@contracts/index';
import { z } from 'zod';

export const ExpertSchema = zodSchemaForType<CreateExpertDto>()(
  z.object({
    avatarUrl: z.string().optional(),
    name: z
      .string({
        errorMap: issue => ({
          message: 'Введите имя эксперта',
        }),
      })
      .trim()
      .min(1, 'Введите имя эксперта'),
  }),
);

export type ExpertSchemaType = z.infer<typeof ExpertSchema>;
