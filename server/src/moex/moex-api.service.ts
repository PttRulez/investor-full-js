import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { IMoexApiResponseCurrentPrices, IMoexApiResponseSecurityInfo } from './types';
import { MoexMarket } from '@contracts/responses/moex-securities';

@Injectable()
export class MoexApi {
  private baseUrl = 'https://iss.moex.com/iss';
  private readonly logger;

  constructor(private http: HttpService) {
    this.logger = new Logger(MoexApi.name);
  }

  async getSecurityByTicker(ticker: string): Promise<IMoexApiResponseSecurityInfo> {
    const moexSecurityUrl = `${this.baseUrl}/securities/${ticker}.json`;

    const { data } = await firstValueFrom(
      this.http.get<IMoexApiResponseSecurityInfo>(moexSecurityUrl, {
        params: {
          'iss.meta': 'off',
          // 'description.columns': 'ssecid,name,shortname,type',
          'boards.columns': 'secid,boardid,market,engine,is_primary',
        },
      }),
    );

    return data;
  }

  async getStocksCurrentPrices(market: MoexMarket, tickers: string): Promise<IMoexApiResponseCurrentPrices> {
    const { data } = await firstValueFrom(
      this.http.get<IMoexApiResponseCurrentPrices>(`engines/stock/markets/${market}/securities.json`, {
        params: {
          'iss.meta': 'off',
          securities: tickers,
          ['securities.columns']: 'SECID,BOARDID,PREPRICE',
        },
      }),
    );

    return data;
  }
}
