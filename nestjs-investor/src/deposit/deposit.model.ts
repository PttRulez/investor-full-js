import { Deposit as DbDeposit } from '@prisma/client';
import { DepositResponse } from 'src/types/frontend/responses/portfolio';

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

  toJSON(): DepositResponse {
    return {
      id: this.id,
      amount: this.amount,
      date: this.date,
    };
  }
}
