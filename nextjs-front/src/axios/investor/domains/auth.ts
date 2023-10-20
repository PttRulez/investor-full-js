import { AxiosInstance, AxiosResponse } from 'axios';
import { RegisterDto, LoginDto } from '@backend/auth/dto';
import { UserFromBackend } from '@/types/backend/domains/auth';
import { parseCookies } from 'nookies';

export default class InvestorAuth {
  private readonly api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async login(dto: LoginDto): Promise<AxiosResponse<UserFromBackend, any>> {
    return this.api.post('/auth/login', { ...dto });
  }

  register(dto: RegisterDto) {}
}
