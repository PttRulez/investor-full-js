import { Controller, Get, Param } from '@nestjs/common';
import { MoexBondService } from './bond.service';
import { IMoexSecurtiyResponse } from '@contracts/index';

@Controller('moex/bonds')
export class BondsController {
  constructor(private moexBondService: MoexBondService) {}

  @Get(':ticker')
  async getBondMoexInfoByTicker(
    @Param('ticker') ticker: string,
  ): Promise<IMoexSecurtiyResponse> {
    const bond = await this.moexBondService.getByTicker(ticker);
    return bond.toJSON();
  }
}
