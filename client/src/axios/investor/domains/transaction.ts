import { CreateCashoutDto, CreateDepositDto } from '@contracts/dtos';
import { ICashoutResponse, IDepositResponse } from '@contracts/responses';
import { AxiosInstance } from 'axios';

export default class InvestorTransaction {
  private readonly api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async createCashout(data: CreateCashoutDto): Promise<ICashoutResponse> {
    const res = await this.api.post<ICashoutResponse>('/cashout', data);
    return res.data;
  }
  async createDeposit(data: CreateDepositDto): Promise<IDepositResponse> {
    const res = await this.api.post<IDepositResponse>('/deposit', data);
    return res.data;
  }

  async deleteCashout(id: number): Promise<ICashoutResponse> {
    const res = await this.api.delete<ICashoutResponse>(`/cashout/${id}`);
    return res.data;
  }

  async deleteDeposit(id: number): Promise<IDepositResponse> {
    const res = await this.api.delete<IDepositResponse>(`/deposit/${id}`);
    return res.data;
  }
}
