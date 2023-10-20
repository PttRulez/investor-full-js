import { Prisma } from '@prisma/client';

export type PortfolioData = {
  userId: number;
  name: string;
  compound: boolean;
};

export type UpdatePortfolioData = Partial<PortfolioData> & Record<'id', number>;

const portfolioWithRelations = Prisma.validator<Prisma.PortfolioDefaultArgs>()({
  include: { deposits: true, cashouts: true, deals: true },
});

export type PortfolioWithRelations = Prisma.PortfolioGetPayload<
  typeof portfolioWithRelations
>;
