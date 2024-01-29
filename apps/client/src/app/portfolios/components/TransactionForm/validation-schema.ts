import { zodSchemaForType } from '@/utils/zod';
import { CreateTransactionDto } from '@contracts/index';
import { TransactionType } from '@contracts/other/enums';
import { z } from 'zod';

export const TransactionSchema = zodSchemaForType<CreateTransactionDto>()(
  z.object({
    amount: z
      .number({
        errorMap: issue => ({
          message: 'Введите сумму кэшаута',
        }),
      })
      .int()
      .positive(),
    date: z.date(),
    portfolioId: z.number(),
    type: z.nativeEnum(TransactionType),
  }),
);

export type TransactionSchemaType = z.infer<typeof TransactionSchema>;
