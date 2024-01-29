import { CreateDealDto, IDealResponse, UpdateDealDto } from '@contracts/index';
import { AxiosInstance } from 'axios';

export class InvestorDeal {
  private readonly api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async createDeal(data: CreateDealDto): Promise<IDealResponse> {
    const res = await this.api.post<IDealResponse>('/deal', data);
    return res.data;
  }

  async deleteDeal(id: number): Promise<IDealResponse> {
    const res = await this.api.delete<IDealResponse>(`/deal/${id}`);
    return res.data;
  }

  updateDeal(data: UpdateDealDto) {
    return this.api.post(`/deals/${data.id}`, data);
  }
}
