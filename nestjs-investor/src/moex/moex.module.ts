import { Module } from '@nestjs/common';
import { MoexApi } from './moex-api.service';
import { MoexService } from './moex.service';

@Module({
  providers: [MoexApi, MoexService],
})
export class MoexModule {}
