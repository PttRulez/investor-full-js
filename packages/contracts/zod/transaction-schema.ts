import { z } from "zod";
import { TransactionType } from "../other/enums";

export const CreateTransactionSchema = z.object({
  amount: z.number(),
  date: z.date(),
  portfolioId: z.number(),
  type: z.nativeEnum(TransactionType),
});

export const UpdateTransactionSchema = CreateTransactionSchema.partial().extend(
  {
    id: z.number(),
  },
);

export type CreateTransaction = z.infer<typeof CreateTransactionSchema>;
export type UpdateTransaction = z.infer<typeof UpdateTransactionSchema>;
