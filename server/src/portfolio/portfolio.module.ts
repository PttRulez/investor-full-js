import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { PortfolioRepository } from './portfolio.repository';
// import { MoexShareRepository } from 'src/moex/moex.share-repository';
// import { MoexBondRepository } from 'src/moex/moex.bond-repository';
// import { MoexApi } from 'src/moex/moex-api.service';
import { Portfolio } from './portfolio.model';
import { MoexModule } from 'src/moex/moex.module';
// import { PortfolioWithRelations, PrismaPortfolio } from './types';

// const portfolioProvider = {
//   provide: 'PortfolioProvider',
//   useFactory: (dbData: PrismaPortfolio | PortfolioWithRelations) => {
//     return new Portfolio(dbData);
//   }
// }

@Module({
  imports: [MoexModule],
  controllers: [PortfolioController],
  providers: [Portfolio, PortfolioService, PortfolioRepository],
})
export class PortfolioModule {}
