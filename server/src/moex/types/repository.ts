import { MoexBoard, MoexEngine, MoexMarket } from '@contracts/responses/moex-securities';

export type MoexRepoCreateShare = {
  ticker: string;
  name: string;
  shortName: string;
  engine: MoexEngine;
  board: MoexBoard;
  market: MoexMarket;
};

export type MoexRepoCreateBond = {
  ticker: string;
  name: string;
  shortName: string;
  engine: MoexEngine;
  board: MoexBoard;
  market: MoexMarket;
};
