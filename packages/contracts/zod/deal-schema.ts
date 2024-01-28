import { z } from "zod";
import { DealType, Exchange, SecurityType } from "../other/enums";

export const CreateDealSchema = z.object({
  amount: z.number(),
  date: z.date(),
  exchange: z.nativeEnum(Exchange),
  portfolioId: z.number(),
  price: z.number(),
  securityType: z.nativeEnum(SecurityType),
  ticker: z.string(),
  type: z.nativeEnum(DealType),
});

export const UpdateDealSchema = CreateDealSchema.partial().extend({
  id: z.number(),
});

export type CreateDeal = z.infer<typeof CreateDealSchema>;
export type UpdateDeal = z.infer<typeof UpdateDealSchema>;
