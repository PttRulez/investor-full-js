import { Module } from '@nestjs/common';
import { DealService } from './deal.service';
import { DealController } from './deal.controller';
import { DealRepository } from './deal.repository';
import { MoexRepository } from 'src/moex/moex.repository';
import { MoexApi } from 'src/moex/moex-api.service';

@Module({
  providers: [DealService, DealRepository, MoexRepository, MoexApi],
  controllers: [DealController],
})
export class DealModule {}
