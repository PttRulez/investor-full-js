import { MoexBoard, MoexEngine, MoexMarket } from '@contracts/responses';

// https://iss.moex.com/iss/securities/SBERP.json?iss.meta=off&boards.columns=secid,boardid,market,engine
export interface IMoexApiResponseSecurityInfo {
  description: {
    columns: ['name', 'title', 'value', 'type', 'sort_order', 'is_hidden', 'precision'];
    data: Array<[string, string, string, string, number, number, number | null]>;
  };

  boards: {
    columns: ['secid', 'boardid', 'market', 'engine', 'is_primary'];
    data: Array<[string, MoexBoard, MoexMarket, MoexEngine, 1 | 0]>;
  };
}

export interface IMoexApiResponseCurrentPrices {
  data: [string, MoexBoard, number][];
}
