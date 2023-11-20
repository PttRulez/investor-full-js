import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { PortfolioRepository } from './portfolio.repository';
import { MoexModule } from 'src/moex/moex.module';
import { MoexService } from 'src/moex/moex.service';

@Module({
  imports: [MoexModule],
  controllers: [PortfolioController],
  providers: [PortfolioService, PortfolioRepository, MoexService],
})
export class PortfolioModule {}
