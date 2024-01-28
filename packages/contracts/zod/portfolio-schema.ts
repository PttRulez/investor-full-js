import { z } from "zod";

export const CreatePortfolioSchema = z.object({
  name: z.string(),
  compound: z.boolean(),
});

export const UpdatePortfolioSchema = CreatePortfolioSchema.partial().extend({
  id: z.number(),
});

export type CreatePortfolio = z.infer<typeof CreatePortfolioSchema>;
export type UpdatePortfolio = z.infer<typeof UpdatePortfolioSchema>;
