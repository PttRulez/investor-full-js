import { AxiosResponse } from 'axios';
import { moexApi } from '@/axios/moex/moex';
import dayjs from 'dayjs';

export const moexService = {
  search(searchParam: string): Promise<AxiosResponse<Record<string, any>>> {
    return moexApi
      .get(`/securities.json?q=${searchParam}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log('fmpService.search', err));
  },
  getAllShares() {
    return moexApi.get(
      'engines/stock/markets/shares/boards/TQBR/securities.json'
    );
  },
  getStocksInfo(market, tickersString: string) {
    return moexApi.get(`engines/stock/markets/${market}/securities.json`, {
      params: {
        securities: tickersString,
        ['securities.columns']: 'SECID,BOARDID,PREVPRICE',
      },
    });
  },
  getStockHistoryByTicker(options) {
    const { market, board, ticker } = options;
    return moexApi.get(
      `/history/engines/stock/markets/${market}/boards/${board}/securities/${ticker}.json`,
      {
        params: {
          ['iss.meta']: 'off',
          ['history.columns']: 'SHORTNAME,OPEN,HIGH,LOW,CLOSE,TRADEDATE',
          from: dayjs().subtract(99, 'day').format('YYYY-MM-DD'),
          till: dayjs('YYYY-MM-DD'),
        },
      }
    );
  },
};
