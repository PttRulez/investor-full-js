import { AxiosInstance } from 'axios';
import { CreatePortfolioDto, UpdatePortfolioDto } from '@contracts/index';
import { IPortfolioResponse } from '@contracts/index';

export class InvestorPortfolio {
  private readonly api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  allPortfolios(): Promise<IPortfolioResponse[]> {
    return this.api
      .get('/portfolio')
      .then(res => {
        return res.data;
      })
      .catch(err => {
        console.log('[investorApi.allPortfolios ERR]:', err);
      });
  }

  getPortfolio(id: string): Promise<IPortfolioResponse> {
    return this.api
      .get(`/portfolio/${id}`)
      .then(res => {
        return res.data;
      })
      .catch(err => console.log('[investorApi.getPortfolio ERR]:', err));
  }

  createPortfolio(data: CreatePortfolioDto): Promise<IPortfolioResponse> {
    return this.api
      .post('/portfolio', data)
      .then(res => {
        return res.data;
      })
      .catch(err => console.log('[investorApi.getPortfolio ERR]:', err));
  }

  updatePortfolio(data: UpdatePortfolioDto) {
    return this.api.patch(`/portfolio`, data);
  }
}
