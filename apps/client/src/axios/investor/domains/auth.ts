import { AxiosInstance, AxiosResponse } from 'axios';
import { LoginDto, RegisterDto, IUserResponse } from 'contracts';

export class InvestorAuth {
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
