import { AxiosInstance, AxiosResponse } from 'axios';
import { CreatePortfolioDto, UpdatePortfolioDto } from '@backend/portfolio/dto/index';
import { Portfolio } from '@/types/backend';

export default class InvestorPortfolio {
  private readonly api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  allPortfolios(): Promise<AxiosResponse<Portfolio[]> | void> {
    return this.api
      .get('/portfolios')
      .then((res: AxiosResponse<Portfolio[]>) => {
        return res;
      })
      .catch(err => {
        console.log('[investorApi.allPortfolios ERR]:', err);
      });
  }

  getPortfolio(id: string): Promise<AxiosResponse<Portfolio>> {
    return this.api
      .get(`/portfolios/${id}`)
      .then(res => {
        return res.data;
      })
      .catch(err => console.log('[investorApi.getPortfolio ERR]:', err));
  }

  createPortfolio(data: CreatePortfolioDto) {
    return this.api.post('/portfolios', data);
  }

  updatePortfolio(data: UpdatePortfolioDto) {
    return this.api.patch(`/portfolios`, data);
  }
}
