import { Injectable, NotFoundException } from '@nestjs/common';
import { CashoutRepository } from './cashout.repository';
import { CreateCashoutDto, UpdateCashoutDto } from '@contracts/dtos';
import { Cashout } from './cashout.model';

@Injectable()
export class CashoutService {
  constructor(private cashoutRepository: CashoutRepository) {}

  create(cashoutData: CreateCashoutDto): Promise<Cashout> {
    return this.cashoutRepository.create(cashoutData);
  }

  async update(cashoutData: UpdateCashoutDto) {
    const foundDepoist = await this.cashoutRepository.findById(cashoutData.id);

    if (!foundDepoist) throw new NotFoundException("Cashout with this id doesn't exist");

    return this.cashoutRepository.update(cashoutData);
  }

  async delete(id: number) {
    return this.cashoutRepository.deleteById(id);
  }
}
