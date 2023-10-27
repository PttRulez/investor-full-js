import { Portfolio } from './portfolio.model';
import { PortfolioData, UpdatePortfolioData } from './types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PortfolioRepository {
  constructor(private prisma: PrismaService) {}

  async create(portfolioData: PortfolioData): Promise<Portfolio> {
    const newPortfolio = await this.prisma.portfolio.create({
      data: { ...portfolioData },
      include: {
        deposits: true,
        cashouts: true,
      },
    });

    return new Portfolio(newPortfolio);
  }

  async findOne(portfolioId: number): Promise<Portfolio | null> {
    const foundPortfolio = await this.prisma.portfolio.findUnique({
      where: { id: portfolioId },
      include: {
        deposits: true,
        cashouts: true,
      },
    });
    if (!foundPortfolio) {
      return null;
    }
    return new Portfolio(foundPortfolio);
  }

  async getAllUserPortfolios(userId: number): Promise<Portfolio[]> {
    const dbPortfolios = await this.prisma.portfolio.findMany({
      where: {
        userId,
      },
      include: {
        deposits: true,
        cashouts: true,
        deals: true,
      },
    });

    return dbPortfolios.map(p => new Portfolio(p));
  }

  async remove(portfolioId: number): Promise<Portfolio> {
    const deleted = await this.prisma.portfolio.delete({
      where: {
        id: portfolioId,
      },
    });

    return new Portfolio(deleted);
  }

  async update(portfolioData: UpdatePortfolioData): Promise<Portfolio> {
    const { id, ...withoudId } = portfolioData;
    const updatedPortfolio = await this.prisma.portfolio.update({
      where: { id },
      data: {
        ...withoudId,
      },
      include: {
        deposits: true,
        cashouts: true,
      },
    });

    return new Portfolio(updatedPortfolio);
  }
}
