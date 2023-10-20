import { DealType } from '@prisma/client';
import { Prisma } from '@prisma/client';

export type CreateDealData = {
  securityId: number;
  amount: number;
  price: number;
  type: DealType;
  date: Date;
  portfolioId: number;
};

export type UpdateDealData = Partial<CreateDealData> & Record<'id', number>;

const dealWithRelations = Prisma.validator<Prisma.DealDefaultArgs>()({
  include: { portfolio: true },
});

export type DealWithRelations = Prisma.DealGetPayload<typeof dealWithRelations>;
