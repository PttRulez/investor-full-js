import { Module } from '@nestjs/common';
import { MoexApi } from './moex-api.service';
import { MoexService } from './moex.service';
import { MoexBondRepository } from './moex.bond-repository';
import { MoexShareRepository } from './moex.share-repository';

@Module({
  providers: [MoexApi, MoexService, MoexBondRepository, MoexShareRepository],
  exports: [MoexApi, MoexBondRepository, MoexShareRepository],
})
export class MoexModule {}
