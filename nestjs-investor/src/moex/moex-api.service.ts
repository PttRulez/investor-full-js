import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { MoexSecurityInfo } from './types';

@Injectable()
export class MoexApi {
  private baseUrl = 'https://iss.moex.com/iss';
  private readonly logger;

  constructor(private http: HttpService) {
    this.logger = new Logger(MoexApi.name);
  }

  async getSecurityByTicker(ticker: string): Promise<MoexSecurityInfo> {
    const moexSecurityUrl = `${this.baseUrl}/securities/${ticker}.json`;

    const { data } = await firstValueFrom(
      this.http.get<MoexSecurityInfo>(moexSecurityUrl, {
        params: {
          'iss.meta': 'off',
          // 'description.columns': 'ssecid,name,shortname,type',
          'boards.columns': 'secid,boardid,market,engine,is_primary',
        },
      }),
    );

    return data;
  }
}
