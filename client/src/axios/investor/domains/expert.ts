import { CreateExpertDto, IExpertResponse } from '@contracts/index';
import { AxiosInstance } from 'axios';

export class InvestorExpert {
  private readonly api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async createExpert(data: CreateExpertDto): Promise<IExpertResponse> {
    const res = await this.api.post<IExpertResponse>('/expert', data);
    return res.data;
  }

  async getExpertsList(): Promise<IExpertResponse[]> {
    const res = await this.api.get<IExpertResponse[]>('/expert');
    return res.data;
  }
}
