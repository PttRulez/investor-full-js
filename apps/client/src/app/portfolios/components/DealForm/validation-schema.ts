import { z } from 'zod';
import { CreateDealDto, DealType, Exchange, SecurityType } from 'contracts';
import { zodSchemaForType } from '@/utils/zod';

export const DealSchema = zodSchemaForType<CreateDealDto>()(
  z.object({
    amount: z
      .number({
        errorMap: issue => ({
          message: 'Введите кол-во бумаг',
        }),
      })
      .int()
      .positive(),
    date: z.date(),
    exchange: z.nativeEnum(Exchange),
    portfolioId: z.number(),
    price: z.number({
      errorMap: issue => ({
        message: 'Введите стоимость сделки',
      }),
    }),
    securityType: z.nativeEnum(SecurityType),
    ticker: z
      .string({
        errorMap: issue => ({
          message: 'Выберите инструмент',
        }),
      })
      .trim()
      .min(1, 'Выберите инструмент'),
    type: z.nativeEnum(DealType),
  }),
);

export type DealSchemaType = z.infer<typeof DealSchema>;
