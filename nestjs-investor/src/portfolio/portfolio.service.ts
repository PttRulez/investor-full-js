import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PortfolioRepository } from './portfolio.repository';
import { Portfolio } from './portfolio.model';
import { UpdatePortfolioData } from './types';

@Injectable()
export class PortfolioService {
  constructor(private portfolioRepository: PortfolioRepository) {}

  create(userId: number, name: string, compound: boolean): Promise<Portfolio> {
    return this.portfolioRepository.create({ userId, name, compound });
  }

  getAllUserPortfolios(userId: number): Promise<Portfolio[]> {
    return this.portfolioRepository.getAllUserPortfolios(userId);
  }

  async getOneById(userId: number, portfolioId: number): Promise<Portfolio> {
    const portfolio = await this.portfolioRepository.findOne(portfolioId);

    if (!portfolio)
      throw new NotFoundException("Portfolio with this id doesn't exist");

    if (!portfolio.belongsToUser(userId))
      throw new UnauthorizedException('Not your portfolio :(');

    return portfolio;
  }

  async update(currentUserId: number, portfolioData: UpdatePortfolioData) {
    const foundPortfolio = await this.portfolioRepository.findOne(
      portfolioData.id,
    );
    if (!foundPortfolio)
      throw new NotFoundException("Portfolio with this id doesn't exist");

    if (!foundPortfolio.belongsToUser(currentUserId))
      throw new UnauthorizedException('Not your portfolio :(');

    return this.portfolioRepository.update(portfolioData);
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
