import { zodSchemaForType } from '@/utils/zod';
import { CreateCashoutDto, CreateDepositDto } from '@contracts/dtos';
import { z } from 'zod';

export const CashoutSchema = zodSchemaForType<CreateCashoutDto>()(
  z.object({
    amount: z
      .number({
        errorMap: issue => ({
          message: 'Введите сумму кэшаута',
        }),
      })
      .int()
      .positive(),
    portfolioId: z.number(),
    date: z.date(),
  }),
);

export const DepositSchema = zodSchemaForType<CreateDepositDto>()(
  z.object({
    amount: z
      .number({
        errorMap: issue => ({
          message: 'Введите сумму депозита',
        }),
      })
      .int()
      .positive(),
    portfolioId: z.number(),
    date: z.date(),
  }),
);

export type CashoutSchemaType = z.infer<typeof CashoutSchema>;
export type DepositSchemaType = z.infer<typeof DepositSchema>;
