import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MoexRepoCreateBond } from './types';
import { MoexBond } from './moexbond.model';

@Injectable()
export class MoexBondRepository {
  constructor(private prisma: PrismaService) {}

  async create(securityData: MoexRepoCreateBond): Promise<MoexBond> {
    console.log('[BOND repo securityData]', securityData);
    const dbSecurity = await this.prisma.moexBond.create({
      data: securityData,
    });

    return new MoexBond(dbSecurity);
  }

  async findByTicker(ticker: string): Promise<MoexBond | null> {
    const foundSec = await this.prisma.moexBond.findUnique({
      where: {
        ticker,
      },
    });

    if (!foundSec) {
      return null;
    }

    return new MoexBond(foundSec);
  }

  async getBulk(ids: number[]): Promise<MoexBond[]> {
    const secs = await this.prisma.moexBond.findMany({
      where: { id: { in: ids } },
    });

    return secs.map(s => new MoexBond(s));
  }
}
