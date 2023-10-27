import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto, UpdatePortfolioDto } from '@contracts/dtos';
import { GetUserId } from '../auth/decorators';
import { IPortfolioResponse } from '@contracts/responses';

@Controller('portfolios')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get()
  async getAllUserPortfolios(@GetUserId() userId: number): Promise<Record<string, any>[]> {
    const portfolios = await this.portfolioService.getAllUserPortfolios(userId);
    return portfolios.map(p => p.toJSON());
  }

  @Get(':id')
  async getOneById(@GetUserId() userId: number, @Param('id') id: string): Promise<IPortfolioResponse> {
    return this.portfolioService.getOneById(userId, Number(id));
  }

  @Post()
  async create(@GetUserId() userId: number, @Body() dto: CreatePortfolioDto): Promise<Record<string, any>> {
    const portfolioModel = await this.portfolioService.create({ ...dto, userId });
    return portfolioModel.toJSON();
  }

  @Patch()
  async update(
    @GetUserId() userId: number,
    @Body() updatePortfolioDto: UpdatePortfolioDto,
  ): Promise<Record<string, any>> {
    const portfolioModel = await this.portfolioService.update(userId, updatePortfolioDto);
    return portfolioModel.toJSON();
  }

  @Delete(':id')
  async remove(@GetUserId() userId: number, @Param('id') portfolioId: string): Promise<IPortfolioResponse> {
    const portfolioModel = await this.portfolioService.remove(userId, Number(portfolioId));
    return portfolioModel.toJSON();
  }
}
