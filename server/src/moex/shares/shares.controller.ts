import { Controller, Get, Param } from '@nestjs/common';
import { MoexShareService } from './share.service';
import { IMoexSecurtiyResponse } from '@contracts/index';

@Controller('moex/shares')
export class SharesController {
  constructor(private moexShareSerivce: MoexShareService) {}

  @Get(':ticker')
  async getMoexShareInfoByTicker(
    @Param('ticker') ticker: string,
  ): Promise<IMoexSecurtiyResponse> {
    const share = await this.moexShareSerivce.getInfoByTicker(ticker);
    return share.toJSON();
  }
}
