import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto, UpdatePortfolioDto } from './dto';
import { GetUserId } from '../auth/decorators';
import { Portfolio as PortfolioResponse } from 'src/types/frontend/responses/portfolio';

@Controller('portfolios')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get()
  getAllUserPortfolios(
    @GetUserId() userId: number,
  ): Promise<PortfolioResponse[]> {
    return this.portfolioService.getAllUserPortfolios(userId);
  }

  @Get(':id')
  getOneById(
    @GetUserId() userId: number,
    @Param('id') id: string,
  ): Promise<PortfolioResponse> {
    return this.portfolioService.getOneById(userId, Number(id));
  }

  @Post()
  create(@GetUserId() userId: number, @Body() dto: CreatePortfolioDto) {
    return this.portfolioService.create(userId, dto.name, dto.compound);
  }

  @Patch()
  update(
    @GetUserId() userId: number,
    @Body() updatePortfolioDto: UpdatePortfolioDto,
  ) {
    return this.portfolioService.update(userId, updatePortfolioDto);
  }

  @Delete(':id')
  remove(@GetUserId() userId: number, @Param('id') portfolioId: string) {
    return this.portfolioService.remove(userId, Number(portfolioId));
  }
}
