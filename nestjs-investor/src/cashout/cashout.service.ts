import { Injectable, NotFoundException } from '@nestjs/common';
import { CashoutRepository } from './cashout.repository';
import { CreateCashoutData, UpdateCashoutData } from './types';

@Injectable()
export class CashoutService {
  constructor(private cashoutRepository: CashoutRepository) {}

  create(cashoutData: CreateCashoutData) {
    return this.cashoutRepository.create(cashoutData);
  }

  async update(cashoutData: UpdateCashoutData) {
    const foundDepoist = await this.cashoutRepository.findById(cashoutData.id);

    if (!foundDepoist)
      throw new NotFoundException("Cashout with this id doesn't exist");

    return this.cashoutRepository.update(cashoutData);
  }
}
