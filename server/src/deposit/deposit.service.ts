import { Injectable, NotFoundException } from '@nestjs/common';
import { DepositRepository } from './deposit.repository';
import { CreateDepositDto, UpdateCashoutDto } from '@contracts/dtos';

@Injectable()
export class DepositService {
  constructor(private depositRepository: DepositRepository) {}

  create(depositData: CreateDepositDto) {
    return this.depositRepository.create(depositData);
  }

  async update(depositData: UpdateCashoutDto) {
    const foundDepoist = await this.depositRepository.findById(depositData.id);

    if (!foundDepoist) throw new NotFoundException("Deposit with this id doesn't exist");

    return this.depositRepository.update(depositData);
  }
}
