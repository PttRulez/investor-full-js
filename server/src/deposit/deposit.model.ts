import { Deposit as DbDeposit } from '@prisma/client';
import { IDepositResponse } from '@contracts/responses';

export class Deposit {
  id: number;
  portfolioId: number;
  amount: number;
  date: Date;

  constructor(dbModel: DbDeposit) {
    this.id = dbModel.id;
    this.portfolioId = dbModel.portfolioId;
    this.amount = dbModel.amount;
    this.date = dbModel.date;
  }

  toJSON(): IDepositResponse {
    return {
      id: this.id,
      amount: this.amount,
      date: this.date,
    };
  }
}
