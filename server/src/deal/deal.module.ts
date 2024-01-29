import { Module } from '@nestjs/common';
import { DealService } from './deal.service';
import { DealController } from './deal.controller';
import { DealRepository } from './deal.repository';
import { MoexShareService } from 'src/moex/shares/share.service';
import { MoexApi } from 'src/moex/iss-api/moex-api.service';
import { MoexBondService } from 'src/moex/bonds/bond.service';

@Module({
  providers: [
    DealRepository,
    DealService,
    MoexApi,
    MoexBondService,
    MoexShareService,
  ],
  controllers: [DealController],
})
export class DealModule {}
