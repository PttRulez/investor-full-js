import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MoexCreatSecuritydata } from './types';
import { MoexSecurity } from './moexsecurity.model';

@Injectable()
export class MoexRepository {
  constructor(private prisma: PrismaService) {}

  async create(securityData: MoexCreatSecuritydata): Promise<MoexSecurity> {
    const dbSecurity = await this.prisma.moexSecurity.create({
      data: securityData,
    });

    return new MoexSecurity(dbSecurity);
  }

  async findByTicker(ticker: string): Promise<MoexSecurity | null> {
    const foundSec = await this.prisma.moexSecurity.findUnique({
      where: {
        ticker,
      },
    });

    if (!foundSec) {
      return null;
    }

    return new MoexSecurity(foundSec);
  }
}
