import { Prisma } from '@prisma/client';

export type PortfolioData = {
  userId: number;
  name: string;
  compound: boolean;
};

export type UpdatePortfolioData = Partial<PortfolioData> & Record<'id', number>;


//Types returned from Prisma Repo
const prismaPortfolio = Prisma.validator<Prisma.PortfolioDefaultArgs>()({});
export type PrismaPortfolio = Prisma.PortfolioGetPayload<typeof prismaPortfolio>;

const portfolioWithRelations = Prisma.validator<Prisma.PortfolioDefaultArgs>()({
  include: { deposits: true, cashouts: true, deals: true },
});

export type PortfolioWithRelations = Prisma.PortfolioGetPayload<
  typeof portfolioWithRelations
>;
