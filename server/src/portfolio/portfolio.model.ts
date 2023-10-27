import { PrismaPortfolio, PortfolioWithRelations } from './types';
import { Cashout } from '../cashout/cashout.model';
import { Deposit } from '../deposit/deposit.model';
import { Deal } from 'src/deal/deal.model';
import { IPortfolioResponse, IPositionResponse, IPortfolioPositionsResponse, MoexMarket } from '@contracts/responses';
import { Exchange, SecurityType } from '@contracts/other/enums';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { MoexBondRepository } from 'src/moex/moex.bond-repository';
import { MoexShareRepository } from 'src/moex/moex.share-repository';
import { MoexApi } from 'src/moex/moex-api.service';
import { IMoexApiResponseCurrentPrices } from 'src/moex/types';

@Injectable()
export class Portfolio {
  cashouts: Array<Cashout>;
  compound: boolean;
  deals: Array<Deal>;
  deposits: Array<Deposit>;
  id: number;
  name: string;
  userId: number;

  constructor(dbModel: PrismaPortfolio);
  constructor(dbModel: PortfolioWithRelations);
  constructor(
    dbModel: PrismaPortfolio | PortfolioWithRelations,
    @Inject(forwardRef(() => MoexBondRepository))
    private readonly moexBondsRepository?: MoexBondRepository,
    @Inject(MoexShareRepository)
    private moexShareRepository?: MoexShareRepository,
    @Inject(MoexApi)
    private moexApi?: MoexApi,
  ) {
    this.id = dbModel.id;
    this.name = dbModel.name;
    this.compound = dbModel.compound;
    this.userId = dbModel.userId;

    this.deposits = 'deposits' in dbModel ? dbModel.deposits.map(d => new Deposit(d)) : [];

    this.cashouts = 'cashouts' in dbModel ? dbModel.cashouts.map(c => new Cashout(c)) : [];
    // this.cashouts = dbModel.cashouts ? dbModel.cashouts.map(c => new Cashout(c)) : [];

    this.deals = 'deals' in dbModel ? dbModel.deals.map(d => new Deal(d)) : [];
    // this.deals = dbModel.deals ? dbModel.deals.map(d => new Deal(d)) : [];
  }

  belongsToUser(userId: number) {
    return userId === this.userId;
  }

  async getMoexPositions(): Promise<IPortfolioPositionsResponse> {
    // just resructuring Deal models in two arrays of bonds and shares
    const moexDeals: { bonds: Deal[]; shares: Deal[] } = this.deals
      .filter(d => d.exchange === Exchange.MOEX)
      .reduce(
        (acc: { bonds: Deal[]; shares: Deal[] }, deal: Deal) => {
          if (deal.secType === SecurityType.BOND) {
            acc.bonds.push(deal);
          } else {
            acc.shares.push(deal);
          }
          return acc;
        },
        { bonds: [], shares: [] },
      );

    // getting prices from moexApi: { data : [ticker, board, currentPrice][] }
    const bondTickersString: string = moexDeals.bonds.map(d => d.ticker).join(',');
    const shareTickersString: string = moexDeals.shares.map(d => d.ticker).join(',');
    const sharePrices: IMoexApiResponseCurrentPrices = await this.moexApi.getStocksCurrentPrices(
      MoexMarket.shares,
      shareTickersString,
    );
    const bondPrices: IMoexApiResponseCurrentPrices = await this.moexApi.getStocksCurrentPrices(
      MoexMarket.bonds,
      bondTickersString,
    );

    // empty result
    const positions: IPortfolioPositionsResponse = { shares: {}, bonds: {} };

    // received bonds and shares models from repo by securityIds from deals
    const bondIdsArray = Array.from(new Set(moexDeals.bonds.map(d => d.securityId)));
    const shareIdsArray = Array.from(new Set(moexDeals.shares.map(d => d.securityId)));
    const moexBondModels = await this.moexBondsRepository.getBulk(bondIdsArray);
    const moexShareModels = await this.moexShareRepository.getBulk(shareIdsArray);

    // calculating amount of securities for each position
    moexDeals.bonds.forEach(d => {
      if (!positions.bonds[d.ticker]) {
        positions.bonds[d.ticker] = { amount: 0 } as IPositionResponse;
      }
      positions.bonds[d.ticker].amount += d.amount;
    });
    moexDeals.shares.forEach(d => {
      if (!positions.shares[d.ticker]) {
        positions.shares[d.ticker] = { amount: 0 } as IPositionResponse;
      }
      positions.shares[d.ticker].amount += d.amount;
    });

    // adding currentPrices to positions
    moexBondModels.forEach(bond => {
      const { amount } = positions.bonds[bond.ticker];
      const currentPrice = (positions.bonds[bond.ticker].currentPrice = bondPrices.data.find(
        priceData => priceData[0] === bond.ticker && priceData[1] === bond.board,
      )[2]);
      const total = currentPrice * amount;

      positions.bonds[bond.ticker] = {
        amount,
        currentPrice,
        total,
        security: bond.toJSON(),
      };
    });

    moexShareModels.forEach(share => {
      const { amount } = positions.shares[share.ticker];
      const currentPrice = (positions.shares[share.ticker].currentPrice = sharePrices.data.find(
        priceData => priceData[0] === share.ticker && priceData[1] === share.board,
      )[2]);
      const total = currentPrice * amount;
      positions.shares[share.ticker] = {
        amount,
        currentPrice,
        total,
        security: share.toJSON(),
      };
    });

    return positions;
  }

  sumCashouts(): number {
    return this.cashouts.reduce<number>((prev, cur) => {
      return prev + cur.amount;
    }, 0);
  }

  sumDeposits(): number {
    return this.deposits.reduce<number>((prev, cur) => {
      return prev + cur.amount;
    }, 0);
  }

  async toJSON(): Promise<IPortfolioResponse> {
    const positions = await this.getMoexPositions();
    const bondsTotal = Object.values(positions.bonds).reduce<number>(
      (acc: number, p: IPositionResponse) => acc + p.total,
      0,
    );
    const sharesTotal = Object.values(positions.shares).reduce<number>(
      (acc: number, p: IPositionResponse) => acc + p.total,
      0,
    );
    const total = bondsTotal + sharesTotal;

    const cashoutsSum = this.sumCashouts();
    const depositsSum = this.sumDeposits();
    const profitability = ((total + cashoutsSum) / depositsSum) * 100 + '%';

    return {
      cashouts: this.cashouts,
      cashoutsSum,
      compound: this.compound,
      deals: this.deals.map(d => d.toJSON()),
      deposits: this.deposits,
      depositsSum,
      id: this.id,
      name: this.name,
      positions,
      total,
      profitability,
    };
  }
}
