import { CreateTransactionDto, UpdateTransactionDto } from '@contracts/index';
import { ITransactionResponse } from '@contracts/index';
import { AxiosInstance } from 'axios';

export class InvestorTransaction {
  private readonly api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async createTransaction(
    data: CreateTransactionDto,
  ): Promise<ITransactionResponse> {
    const res = await this.api.post<ITransactionResponse>('/transaction', data);
    return res.data;
  }

  async deleteTransaction(id: number): Promise<ITransactionResponse> {
    const res = await this.api.delete<ITransactionResponse>(`/cashout/${id}`);
    return res.data;
  }
}
