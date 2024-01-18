import { z } from 'zod';
import { zodSchemaForType } from '@/utils/zod';
import {
  CreateOpinionDto,
  Exchange,
  OpinionType,
  SecurityType,
} from '@contracts/index';

export const OpinionSchema = zodSchemaForType<CreateOpinionDto>()(
  z.object({
    date: z.date(),
    exchange: z.nativeEnum(Exchange),
    expertId: z.number(),
    text: z.string(),
    securityType: z.nativeEnum(SecurityType),
    securityId: z.number(),
    sourceLink: z.string().optional(),
    targetPrice: z.number().nullable(),
    type: z.nativeEnum(OpinionType),
  }),
);

export type OpinionSchemaType = z.infer<typeof OpinionSchema>;
