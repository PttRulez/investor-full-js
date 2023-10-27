import { Module } from '@nestjs/common';
import { DealService } from './deal.service';
import { DealController } from './deal.controller';
import { DealRepository } from './deal.repository';
import { MoexShareRepository } from 'src/moex/moex.share-repository';
import { MoexApi } from 'src/moex/moex-api.service';
import { MoexBondRepository } from 'src/moex/moex.bond-repository';

@Module({
  providers: [DealService, DealRepository, MoexShareRepository, MoexBondRepository, MoexApi],
  controllers: [DealController],
})
export class DealModule {}
