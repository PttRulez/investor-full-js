import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MoexRepoCreateShare } from './types';
import { MoexShare } from './moexshare.model';

@Injectable()
export class MoexShareRepository {
  constructor(private prisma: PrismaService) {}

  async create(securityData: MoexRepoCreateShare): Promise<MoexShare> {
    console.log('[SHARE repo securityData]', securityData);
    const dbSecurity = await this.prisma.moexShare.create({
      data: securityData,
    });

    return new MoexShare(dbSecurity);
  }

  async findByTicker(ticker: string): Promise<MoexShare | null> {
    const foundSec = await this.prisma.moexShare.findUnique({
      where: {
        ticker,
      },
    });

    if (!foundSec) {
      return null;
    }

    return new MoexShare(foundSec);
  }

  async getBulk(ids: number[]): Promise<MoexShare[]> {
    const secs = await this.prisma.moexShare.findMany({
      where: { id: { in: ids } },
    });

    return secs.map(s => new MoexShare(s));
  }
}
