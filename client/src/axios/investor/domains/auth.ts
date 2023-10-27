import { AxiosInstance, AxiosResponse } from 'axios';
import { parseCookies } from 'nookies';
import { LoginDto, RegisterDto } from '@contracts/dtos';
import { IUserResponse } from '@contracts/responses';

export default class InvestorAuth {
  private readonly api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async login(dto: LoginDto): Promise<AxiosResponse<IUserResponse, any>> {
    return this.api.post('/auth/login', { ...dto });
  }

  register(dto: RegisterDto): Promise<AxiosResponse<IUserResponse, any>> {
    return this.api.post('/auth/register', { ...dto });
  }
}
