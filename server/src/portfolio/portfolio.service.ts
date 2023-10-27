import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PortfolioRepository } from './portfolio.repository';
import { IPortfolioResponse } from '@contracts/responses';
import { PortfolioData, UpdatePortfolioData } from './types';
import { Portfolio } from './portfolio.model';
import { MoexShareRepository } from 'src/moex/moex.share-repository';
import { MoexBondRepository } from 'src/moex/moex.bond-repository';
import { MoexApi } from 'src/moex/moex-api.service';

@Injectable()
export class PortfolioService {
  constructor(
    private portfolioRepository: PortfolioRepository,
    private moexShareRepo: MoexShareRepository,
    private moexBondRepo: MoexBondRepository,
    private moexApi: MoexApi,
  ) {}

  create(portfolioData: PortfolioData): Promise<Portfolio> {
    return this.portfolioRepository.create(portfolioData);
  }

  getAllUserPortfolios(userId: number): Promise<Portfolio[]> {
    return this.portfolioRepository.getAllUserPortfolios(userId);
  }

  async getOneById(userId: number, portfolioId: number): Promise<IPortfolioResponse> {
    return {} as IPortfolioResponse;
    const portfolio = await this.portfolioRepository.findOne(portfolioId);

    if (!portfolio) throw new NotFoundException("Portfolio with this id doesn't exist");

    if (!portfolio.belongsToUser(userId)) throw new UnauthorizedException('Not your portfolio :(');

    const securityIdsSet: Set<number> = new Set();
    portfolio.deals.forEach(deal => securityIdsSet.add(deal.securityId));
    // const dbSecurities = await this.moexRepo.getBulk(Array.from(securityIdsSet));
    // const securities: Record<string, MoexSecurity> = {};

    // const byMarkets = {};
    // for (const sec of dbSe) const tickersString = dbSecurities.map(s => s.ticker).join(',');
    // const currentPrices = this.moexApi.getStocksCurrentPrices();

    // dbSecurities.forEach(s => (securities[s.id] = s));

    // const positions: Record<string, IPositionResponse> = {};

    // for (const deal of portfolio.deals) {
    //   if (!positions[deal.securityId]) {
    //     positions[deal.securityId] = {
    //       amount: deal.amount,
    //     };
    //   } else {
    //     const prev = { ...positions[deal.ticker] };
    //     const total = deal.amount * deal.price + prev.amount * prev.price;
    //     const amount = deal.amount + prev.amount;
    //     positions[deal.ticker].amount = amount;
    //     positions[deal.ticker].total = total;
    //     positions[deal.ticker].price = (total / amount).toFixed(2);
    //   }
    // }

    // return {
    //   ...portfolio.toJSON(),
    //   cashoutsSum: portfolio.sumCashouts(),
    //   depositsSum: portfolio.sumDeposits(),
    //   positions,
    //   profitability,
    //   total,
    // };
  }

  async update(currentUserId: number, portfolioData: UpdatePortfolioData) {
    const foundPortfolio = await this.portfolioRepository.findOne(portfolioData.id);
    if (!foundPortfolio) throw new NotFoundException("Portfolio with this id doesn't exist");

    if (!foundPortfolio.belongsToUser(currentUserId)) throw new UnauthorizedException('Not your portfolio :(');

    return this.portfolioRepository.update(portfolioData);
  }

  async remove(currentUserId: number, portfolioId: number) {
    const foundPortfolio = await this.portfolioRepository.findOne(portfolioId);
    if (!foundPortfolio) throw new NotFoundException("Portfolio with this id doesn't exist");

    if (!foundPortfolio.belongsToUser(currentUserId)) throw new UnauthorizedException('Not your portfolio :(');

    return this.portfolioRepository.remove(portfolioId);
  }
}
