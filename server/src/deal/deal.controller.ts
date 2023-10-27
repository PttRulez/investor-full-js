import { Body, Controller, Post } from '@nestjs/common';
import { DealService } from './deal.service';
import { CreateDealDto } from '@contracts/dtos';
import { IDealResponse } from '@contracts/responses';
import { Deal } from './deal.model';

@Controller('deal')
export class DealController {
  constructor(private dealService: DealService) {}

  @Post()
  async createDeal(@Body() dto: CreateDealDto): Promise<IDealResponse> {
    const deal = await this.dealService.create(dto.ticker, new Deal(dto));
    return deal.toJSON();
  }
}
