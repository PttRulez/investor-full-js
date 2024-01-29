import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { PortfolioRepository } from './portfolio.repository';
import { MoexModule } from 'src/moex/moex.module';
import { MoexService } from 'src/moex/moex.service';
import { PositionModule } from 'src/position/position.module';
import { PositionService } from 'src/position/position.service';

@Module({
  imports: [MoexModule, PositionModule],
  controllers: [PortfolioController],
  providers: [
    MoexService,
    PortfolioService,
    PortfolioRepository,
    PositionService,
  ],
})
export class PortfolioModule {}
