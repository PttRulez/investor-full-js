import { Injectable, Logger } from '@nestjs/common';
import { MoexBondRepository } from './moex.bond-repository';
import { MoexShareRepository } from './moex.share-repository';
import { MoexApi } from './moex-api.service';
import { Deal } from 'src/deal/deal.model';
import { Portfolio } from 'src/portfolio/portfolio.model';
import { Exchange, SecurityType } from '@contracts/other/enums';
import { MoexPositions } from './moexpositions';

@Injectable()
export class MoexService {
  private readonly logger = new Logger(MoexService.name);
  constructor(
    private readonly moexBondsRepository?: MoexBondRepository,
    private moexSharesRepository?: MoexShareRepository,
    private moexApi?: MoexApi,
  ) {}

  async getMoexPortfolioresults(model: Portfolio): Promise<{ positions: MoexPositions; total: number }> {
    // just resructuring Deal models in two arrays of bonds and shares
    const moexDeals: { bonds: Deal[]; shares: Deal[] } = model.deals
      .filter(d => d.exchange === Exchange.MOEX)
      .reduce(
        (acc: { bonds: Deal[]; shares: Deal[] }, deal: Deal) => {
          if (deal.secType === SecurityType.BOND) {
            acc.bonds.push(deal);
          } else {
            acc.shares.push(deal);
          }
          return acc;
        },
        { bonds: [], shares: [] },
      );

    // empty result
    const positions: MoexPositions = new MoexPositions(
      moexDeals,
      this.moexApi,
      this.moexBondsRepository,
      this.moexSharesRepository,
    );
    await positions.calculateResults();

    const total = positions.bondsTotal + positions.sharesTotal;

    return { positions, total };
  }
}
