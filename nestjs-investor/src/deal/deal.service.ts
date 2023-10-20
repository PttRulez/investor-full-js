import { ImATeapotException, Injectable } from '@nestjs/common';
import { DealRepository } from './deal.repository';
import { CreateDealData } from './types';
import { Exchange } from 'src/common/enums';
import { MoexRepository } from 'src/moex/moex.repository';
import { MoexApi } from 'src/moex/moex-api.service';

@Injectable()
export class DealService {
  constructor(
    private dealRepository: DealRepository,
    private moexRepository: MoexRepository,
    private moexApi: MoexApi,
  ) {}

  async create(
    exchange: Exchange,
    ticker: string,
    dealData: Omit<CreateDealData, 'securityId'>,
  ) {
    // check by exchange property from which table u get security
    // for now it's always moex
    // get the security model
    let security = await this.moexRepository.findByTicker(ticker);

    if (!security) {
      const dataFromMoex = await this.moexApi.getSecurityByTicker(ticker);
      const name = dataFromMoex.description.data.find(
        (arr) => arr[0] === 'NAME',
      )?.[2];
      const shortName = dataFromMoex.description.data.find(
        (arr) => arr[0] === 'SHORTNAME',
      )?.[2];
      const boardData = dataFromMoex.boards.data.find((i) => i[4] === 1);
      const engine = boardData?.[3];
      const market = boardData?.[2];
      const board = boardData?.[1];

      if (
        [name, shortName, boardData, board, market, engine].find(
          (i) => i === undefined,
        )
      ) {
        throw new ImATeapotException(
          `[${DealService.name}]: Проблема с данными полученными в московской бирже`,
        );
      }

      security = await this.moexRepository.create({
        ticker,
        name,
        shortName,
        engine,
        market,
        board,
      });
    }

    return this.dealRepository.create({ ...dealData, securityId: security.id });
  }
}
