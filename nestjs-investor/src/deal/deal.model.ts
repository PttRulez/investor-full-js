import { Deal as PrismaDeal, DealType } from '@prisma/client';
import { Portfolio } from 'src/portfolio/portfolio.model';
import { DealWithRelations } from './types';
import { Exchange } from 'src/common/enums';

export class Deal {
  id: number;
  securityId: number;
  exchange: Exchange;
  amount: number;
  price: number;
  type: DealType;
  date: Date;
  portfolioId: number;
  portfolio?: Portfolio;

  constructor(dbModel: PrismaDeal);
  constructor(dbModel: DealWithRelations) {
    this.id = dbModel.id;
    this.securityId = dbModel.securityId;
    this.amount = dbModel.amount;
    this.price = Number(dbModel.price);
    this.type = dbModel.type;
    this.date = dbModel.date;
    this.portfolioId = dbModel.portfolioId;

    if (dbModel.portfolio) {
      this.portfolio = new Portfolio(dbModel.portfolio);
    }
  }

  toJSON() {
    const json: Record<string, any> = {
      id: this.id,
      securityId: this.securityId,
      amount: this.amount,
      price: this.price,
      type: this.type,
      date: this.date,
      portfolio: this.portfolio,
    };

    return json;
  }
}
