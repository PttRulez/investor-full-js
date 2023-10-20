import { Body, Controller, Post } from '@nestjs/common';
import { DealService } from './deal.service';
import { CreateDealDto } from './dto';

@Controller('deal')
export class DealController {
  constructor(private dealService: DealService) {}

  @Post()
  createDeal(@Body() dto: CreateDealDto) {
    const { exchange, ticker, ...dealData } = dto;
    return this.dealService.create(exchange, ticker, dealData);
  }
}
