import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Cashout } from './cashout.model';
import { CreateCashoutDto, UpdateCashoutDto } from '@contracts/dtos';

@Injectable()
export class CashoutRepository {
  constructor(private prisma: PrismaService) {}

  async findById(cashoutId: number): Promise<Cashout | null> {
    const foundCashout = await this.prisma.cashout.findUnique({
      where: {
        id: cashoutId,
      },
    });

    if (!foundCashout) return null;

    return new Cashout(foundCashout);
  }

  async create(cashoutData: CreateCashoutDto): Promise<Cashout> {
    const newCashout = await this.prisma.cashout.create({
      data: {
        ...cashoutData,
      },
    });

    return new Cashout(newCashout);
  }

  async update(cashoutData: UpdateCashoutDto): Promise<Cashout> {
    const newCashout = await this.prisma.cashout.update({
      where: {
        id: cashoutData.id,
      },
      data: {
        ...cashoutData,
      },
    });

    return new Cashout(newCashout);
  }

  async deleteById(cashoutId: number): Promise<Cashout> {
    const deleted = await this.prisma.cashout.delete({
      where: {
        id: cashoutId,
      },
    });

    return new Cashout(deleted);
  }
}
