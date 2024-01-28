import { z } from "zod";
import { Exchange, OpinionType, SecurityType } from "../other/enums";

export const CreateOpinionSchema = z.object({
  date: z.date(),
  exchange: z.nativeEnum(Exchange),
  expertId: z.number(),
  text: z.string(),
  securityType: z.nativeEnum(SecurityType),
  securityId: z.number(),
  sourceLink: z.string().optional(),
  targetPrice: z.number().optional(),
  type: z.nativeEnum(OpinionType),
});

export type CreateOpinion = z.infer<typeof CreateOpinionSchema>;

export const UpdateOpinionSchema = CreateOpinionSchema.partial().extend({
  id: z.number(),
});

export type UpdateOpinion = z.infer<typeof UpdateOpinionSchema>;

export const OpinionFiltersSchema = z.object({
  exchange: z.nativeEnum(Exchange).optional(),
  expertId: z.number().optional(),
  securityType: z.nativeEnum(SecurityType).optional(),
  securityId: z.number().optional(),
  type: z.nativeEnum(OpinionType).optional(),
});

export type OpinionFilters = z.infer<typeof OpinionFiltersSchema>;
