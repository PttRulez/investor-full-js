import { PrismaPortfolio, PortfolioWithRelations, PortfolioPositions } from './types';
import { Cashout } from '../cashout/cashout.model';
import { Deposit } from '../deposit/deposit.model';
import { Deal } from 'src/deal/deal.model';
import { IPortfolioListResponse, IPortfolioResponse } from '@contracts/responses';

export class Portfolio {
  bondsTotal: number = 0;
  cashouts: Array<Cashout>;
  compound: boolean;
  deals: Array<Deal>;
  deposits: Array<Deposit>;
  id: number;
  name: string;
  positions?: PortfolioPositions;
  sharesTotal: number = 0;
  total: number = 0;
  userId: number;

  constructor(dbModel: PrismaPortfolio);
  constructor(dbModel: PortfolioWithRelations) {
    this.id = dbModel.id;
    this.name = dbModel.name;
    this.compound = dbModel.compound;
    this.userId = dbModel.userId;

    this.deposits = 'deposits' in dbModel ? dbModel.deposits.map(d => new Deposit(d)) : [];

    this.cashouts = 'cashouts' in dbModel ? dbModel.cashouts.map(c => new Cashout(c)) : [];

    this.deals = 'deals' in dbModel ? dbModel.deals.map(d => new Deal(d)) : [];
  }

  belongsToUser(userId: number) {
    return userId === this.userId;
  }

  setResults(result: { positions: PortfolioPositions; total: number }): void {
    this.positions = result.positions;
    this.total = result.total;
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

  toListJSON(): IPortfolioListResponse {
    return {
      id: this.id,
      compound: this.compound,
      name: this.name,
    };
  }

  toJSON(): IPortfolioResponse {
    const cashoutsSum = this.sumCashouts();
    const depositsSum = this.sumDeposits();
    const profitability = (depositsSum ? ((this.total + cashoutsSum) / depositsSum - 1) * 100 : 0).toFixed(1) + '%';

    return {
      cashouts: this.cashouts.map(c => c.toJSON()),
      cashoutsSum,
      compound: this.compound,
      deals: this.deals.map(d => d.toJSON()),
      deposits: this.deposits.map(d => d.toJSON()),
      depositsSum,
      id: this.id,
      name: this.name,
      positions: this.positions
        ? this.positions.toJSON()
        : { allPositions: [], sharePositions: [], bondPositions: [], sharesTotal: 0, bondsTotal: 0 },
      total: this.total,
      transactions: [...this.cashouts, ...this.deposits]
        .sort((a, b) => (a.date > b.date ? 1 : -1))
        .map(t => t.toJSON()),
      profitability,
    };
  }
}
