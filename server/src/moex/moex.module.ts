import { Module } from '@nestjs/common';
import { MoexApi } from './iss-api/moex-api.service';
import { MoexService } from './moex.service';
import { MoexBondService } from './bonds/bond.service';
import { MoexShareService } from './shares/share.service';
import { BondsController } from './bonds/bonds.controller';
import { SharesController } from './shares/shares.controller';

@Module({
  providers: [MoexApi, MoexService, MoexBondService, MoexShareService],
  exports: [MoexApi, MoexBondService, MoexShareService],
  controllers: [BondsController, SharesController],
})
export class MoexModule {}
