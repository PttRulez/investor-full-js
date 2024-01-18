import { moexApi } from '@/axios/moex/moex';
import dayjs from 'dayjs';
import { IMoexISSPricesHistory, IMoexISSSearchResults } from '@contracts/other/moex-iss-api';
import { AxiosError } from 'axios';
import { MoexBoard, MoexMarket } from '@contracts/index';

export const moexService = {
  async search(searchParam: string): Promise<IMoexISSSearchResults> {
    const res = await moexApi
      .get<IMoexISSSearchResults>(`/securities.json?q=${searchParam}`)
      .then(res => {
        return res;
      })
      .catch(err => console.log('fmpService.search', err));

    if (res) {
      return res.data;
    } else {
      throw new AxiosError('Нет ответа от МосБиржи');
    }
  },

  getAllShares() {
    return moexApi.get(
      'engines/stock/markets/shares/boards/TQBR/securities.json',
    );
  },

  getStocksInfo(market: MoexMarket, tickersString: string) {
    return moexApi.get(`engines/stock/markets/${market}/securities.json`, {
      params: {
        securities: tickersString,
        ['securities.columns']: 'SECID,BOARDID,PREVPRICE',
      },
    });
  },
  // /history/engines/stock/markets/shares/boards/TBQR/securities/SBERP.json
  getStockHistoryByTicker(options: {
    market: MoexMarket;
    board: MoexBoard;
    ticker: string;
  }) {
    const { market, board, ticker } = options;
    return moexApi.get<IMoexISSPricesHistory>(
      `/history/engines/stock/markets/${market}/boards/${board}/securities/${ticker}.json`,
      {
        params: {
          ['iss.meta']: 'off',
          ['history.columns']: 'SHORTNAME,OPEN,HIGH,LOW,CLOSE,TRADEDATE',
          from: dayjs().subtract(99, 'day').format('YYYY-MM-DD'),
          till: dayjs('YYYY-MM-DD'),
        },
      },
    );
  },
};
