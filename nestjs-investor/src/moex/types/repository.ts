import { MoexBoard, MoexEngine, MoexMarket } from '@prisma/client';

export type MoexCreatSecuritydata = {
  ticker: string;
  name: string;
  shortName: string;
  engine: MoexEngine;
  board: MoexBoard;
  market: MoexMarket;
};
