import { Cashout as DbCashout } from '@prisma/client';
import { CashoutResponse } from 'src/types/frontend/responses/portfolio';

export class Cashout {
  id: number;
  portfolioId: number;
  amount: number;
  date: Date;

  constructor(dbModel: DbCashout) {
    this.id = dbModel.id;
    this.portfolioId = dbModel.portfolioId;
    this.amount = dbModel.amount;
    this.date = dbModel.date;
  }

  toJSON(): CashoutResponse {
    return {
      id: this.id,
      amount: this.amount,
      date: this.date,
    };
  }
}
