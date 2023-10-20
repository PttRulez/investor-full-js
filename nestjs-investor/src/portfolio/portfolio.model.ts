import { PortfolioWithRelations } from './types';
import { Portfolio as PrismaPortfolio } from '@prisma/client';
import { Cashout } from '../cashout/cashout.model';
import { Deposit } from '../deposit/deposit.model';
import { Deal } from 'src/deal/deal.model';
import { PortfolioResponse } from 'src/types/frontend/responses/portfolio';

export class Portfolio {
  id: number;
  userId: number;
  name: string;
  compound: boolean;
  deposits: Array<Deposit>;
  cashouts: Array<Cashout>;
  deals: Array<Deal>;

  constructor(dbModel: PrismaPortfolio);
  constructor(dbModel: PortfolioWithRelations) {
    this.id = dbModel.id;
    this.name = dbModel.name;
    this.compound = dbModel.compound;
    this.userId = dbModel.userId;

    this.deposits = dbModel.deposits
      ? dbModel.deposits.map((d) => new Deposit(d))
      : [];

    this.cashouts = dbModel.cashouts
      ? dbModel.cashouts.map((c) => new Cashout(c))
      : [];

    this.deals = dbModel.deals ? dbModel.deals.map((d) => new Deal(d)) : [];
  }

  belongsToUser(userId: number) {
    return userId === this.userId;
  }

  toJSON(): PortfolioResponse {
    return {
      id: this.id,
      name: this.name,
      compound: this.compound,
      deposits: this.deposits,
      cashouts: this.cashouts,
      deals: this.deals,
    };
  }
}
