import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Deposit } from './deposit.model';
import { CreateDepositDto, UpdateDepositDto } from '@contracts/dtos';

@Injectable()
export class DepositRepository {
  constructor(private prisma: PrismaService) {}

  async findById(depositId: number): Promise<Deposit | null> {
    const foundDeposit = await this.prisma.deposit.findUnique({
      where: {
        id: depositId,
      },
    });

    if (!foundDeposit) return null;

    return new Deposit(foundDeposit);
  }

  async create(depositData: CreateDepositDto): Promise<Deposit> {
    const newDeposit = await this.prisma.deposit.create({
      data: {
        ...depositData,
      },
    });

    return new Deposit(newDeposit);
  }

  async update(depositData: UpdateDepositDto): Promise<Deposit> {
    const newDeposit = await this.prisma.deposit.update({
      where: {
        id: depositData.id,
      },
      data: {
        ...depositData,
      },
    });

    return new Deposit(newDeposit);
  }

  async deleteById(depositId: number): Promise<Deposit> {
    const deleted = await this.prisma.deposit.delete({
      where: {
        id: depositId,
      },
    });

    return new Deposit(deleted);
  }
}
