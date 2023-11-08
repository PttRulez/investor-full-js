import { Cashout as DbCashout } from '@prisma/client';
import { ICashoutResponse } from '@contracts/responses';
import { TransactionType } from '@contracts/other/enums';

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

  toJSON(): ICashoutResponse {
    return {
      id: this.id,
      amount: this.amount,
      date: this.date,
      type: TransactionType.CASHOUT
    };
  }
}
