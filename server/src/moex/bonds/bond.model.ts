import { MoexBond as PrismaMoexBond } from '@prisma/client';
import {
  IMoexSecurtiyResponse,
  MoexBoard,
  MoexEngine,
  MoexMarket,
} from '@contracts/index';
import { SecurityType } from '@contracts/other/enums';

export class MoexBond {
  board: MoexBoard;
  currentPrice: number = 0;
  engine: MoexEngine;
  id: number;
  market: MoexMarket;
  name: string;
  shortName: string;
  ticker: string;

  constructor(data: PrismaMoexBond) {
    this.id = data.id;
    this.ticker = data.ticker;
    this.name = data.name;
    this.shortName = data.shortName;
    this.engine = data.engine as MoexEngine;
    this.board = data.board as MoexBoard;
    this.market = data.market as MoexMarket;
  }

  toJSON(): IMoexSecurtiyResponse {
    return {
      board: this.board,
      engine: this.engine,
      id: this.id,
      market: this.market,
      name: this.name,
      shortName: this.shortName,
      securityType: SecurityType.BOND,
      ticker: this.ticker,
    };
  }
}
