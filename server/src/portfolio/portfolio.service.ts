import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PortfolioRepository } from './portfolio.repository';
import { IPortfolioResponse } from '@contracts/responses';
import { PrismaCreatePortfolioData, PrismaUpdatePortfolioData } from './types';
import { Portfolio } from './portfolio.model';
import { MoexService } from 'src/moex/moex.service';

@Injectable()
export class PortfolioService {
  constructor(
    private portfolioRepository: PortfolioRepository,
    private moexService: MoexService,
  ) {}

  create(portfolioData: PrismaCreatePortfolioData): Promise<Portfolio> {
    return this.portfolioRepository.create(portfolioData);
  }

  getAllUserPortfolios(userId: number): Promise<Portfolio[]> {
    return this.portfolioRepository.getAllUserPortfolios(userId);
  }

  async getOneById(
    userId: number,
    portfolioId: number,
  ): Promise<IPortfolioResponse> {
    const portfolio = await this.portfolioRepository.findOne(portfolioId);

    if (!portfolio)
      throw new NotFoundException("Portfolio with this id doesn't exist");

    if (!portfolio.belongsToUser(userId))
      throw new UnauthorizedException('Not your portfolio :(');

    const moexResults =
      await this.moexService.getMoexPortfolioresults(portfolio);

    portfolio.setResults(moexResults);

    return portfolio.toJSON();
  }

  async update(
    currentUserId: number,
    portfolioId: number,
    portfolioData: PrismaUpdatePortfolioData,
  ) {
    const foundPortfolio = await this.portfolioRepository.findOne(portfolioId);
    if (!foundPortfolio)
      throw new NotFoundException("Portfolio with this id doesn't exist");

    if (!foundPortfolio.belongsToUser(currentUserId))
      throw new UnauthorizedException('Not your portfolio :(');

    return this.portfolioRepository.update(portfolioId, portfolioData);
  }

  async remove(currentUserId: number, portfolioId: number) {
    const foundPortfolio = await this.portfolioRepository.findOne(portfolioId);
    if (!foundPortfolio)
      throw new NotFoundException("Portfolio with this id doesn't exist");

    if (!foundPortfolio.belongsToUser(currentUserId))
      throw new UnauthorizedException('Not your portfolio :(');

    return this.portfolioRepository.remove(portfolioId);
  }
}
