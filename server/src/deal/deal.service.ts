import { ImATeapotException, Injectable } from '@nestjs/common';
import { DealRepository } from './deal.repository';
import { MoexShareRepository } from 'src/moex/moex.share-repository';
import { MoexBondRepository } from 'src/moex/moex.bond-repository';
import { MoexApi } from 'src/moex/moex-api.service';
import { MoexSecurity } from 'src/moex/types';
import { IMoexApiResponseSecurityInfo } from 'src/moex/types';
import { Deal } from './deal.model';

@Injectable()
export class DealService {
  constructor(
    private dealRepository: DealRepository,
    private moexShareRepository: MoexShareRepository,
    private moexBondRepository: MoexBondRepository,
    private moexApi: MoexApi,
  ) {}

  async create(ticker: string, dealModel: Deal) {
    // check by exchange property from which table u get security
    // for now it's always moex
    // get the security model
    let security: MoexSecurity | null = null;

    if (dealModel.isShare()) {
      security = await this.moexShareRepository.findByTicker(ticker);
    } else if (dealModel.isBond()) {
      security = await this.moexBondRepository.findByTicker(ticker);
    }

    // create security if was not found by ticker
    if (!security) {
      const dataFromMoex: IMoexApiResponseSecurityInfo = await this.moexApi.getSecurityByTicker(ticker);

      const name = dataFromMoex.description.data.find(arr => arr[0] === 'NAME')?.[2];
      const shortName = dataFromMoex.description.data.find(arr => arr[0] === 'SHORTNAME')?.[2];
      const boardData = dataFromMoex.boards.data.find(i => i[4] === 1);
      const engine = boardData?.[3];
      const market = boardData?.[2];
      const board = boardData?.[1];

      if ([name, shortName, boardData, board, market, engine].find(i => i === undefined)) {
        throw new ImATeapotException(`[${DealService.name}]: Проблема с данными полученными в московской бирже`);
      }

      if (dealModel.isShare()) {
        security = await this.moexShareRepository.create({
          board,
          engine,
          market,
          name,
          shortName,
          ticker,
        });
      } else if (dealModel.isBond()) {
        security = await this.moexBondRepository.create({
          board,
          engine,
          market,
          name,
          shortName,
          ticker,
        });
      }
    }
    dealModel.setSecurityId(security.id);

    return this.dealRepository.create(dealModel.forPrismaCreate());
  }

  async delete(id: number): Promise<Deal> {
    const deal = await this.dealRepository.deleteById(id);
    return deal;
  }
}
