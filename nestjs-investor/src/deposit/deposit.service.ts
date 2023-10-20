import { Injectable, NotFoundException } from '@nestjs/common';
import { DepositRepository } from './deposit.repository';
import { CreateDepositData, UpdateDepositData } from './types';

@Injectable()
export class DepositService {
  constructor(private depositRepository: DepositRepository) {}

  create(depositData: CreateDepositData) {
    return this.depositRepository.create(depositData);
  }

  async update(depositData: UpdateDepositData) {
    const foundDepoist = await this.depositRepository.findById(depositData.id);

    if (!foundDepoist)
      throw new NotFoundException("Deposit with this id doesn't exist");

    return this.depositRepository.update(depositData);
  }
}
