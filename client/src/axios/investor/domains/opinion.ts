import {
  CreateOpinionDto,
  IOpinionResponse,
  OpinionFilters,
} from '@contracts/index';
import { AxiosInstance } from 'axios';

export class InvestorOpinion {
  private readonly api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async createOpinion(data: CreateOpinionDto): Promise<IOpinionResponse> {
    const res = await this.api.post<IOpinionResponse>('/opinion', data);
    return res.data;
  }

  async getOpinionsList(filters: OpinionFilters): Promise<IOpinionResponse[]> {
    const res = await this.api.post<IOpinionResponse[]>(
      '/opinion/list',
      filters,
    );
    return res.data;
  }
}
