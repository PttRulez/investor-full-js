import { MoexBoard, MoexEngine, MoexMarket } from '@prisma/client';
import { MoexSecurity as PrismaMoexSecurity } from '@prisma/client';

export class MoexSecurity {
  id: number;
  ticker: string;
  name: string;
  shortName: string;
  engine: MoexEngine;
  board: MoexBoard;
  market: MoexMarket;

  constructor(data: PrismaMoexSecurity) {
    this.id = data.id;
    this.ticker = data.ticker;
    this.name = data.name;
    this.shortName = data.shortName;
    this.engine = data.engine;
    this.board = data.board;
    this.market = data.market;
  }
}
