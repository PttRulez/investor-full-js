import { AxiosInstance } from 'axios';

export default class InvestorDeal {
  private readonly api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  createDeal(data: Deal) {
    return this.api.post('/deals', data);
  }

  updateDeal(data: Deal) {
    return this.api.post(`/deals/${data.id}`, data);
  }
}
