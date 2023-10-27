import { Body, Controller, HttpCode, HttpStatus, Post, Session } from '@nestjs/common';
import { RegisterDto, LoginDto } from '@contracts/dtos';
import { AuthService } from './auth.service';
import { UserSession } from './types';
import { IUserResponse } from '@contracts/responses';
import { PublicRoute } from './decorators';
import { Role } from '@contracts/other/enums';

@PublicRoute()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto): Promise<IUserResponse> {
    const { email, password, name, role } = dto;

    return this.authService.register({
      email,
      password,
      name,
      role,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Session() session: UserSession): Promise<IUserResponse> {
    const user = await this.authService.login({
      email: loginDto.email,
      password: loginDto.password,
    });

    this.serializeSession(user.id, user.email, user.role, session);
    console.log('[AuthCOntroller login] user', user);
    return user;
  }

  private serializeSession(id: number, email: string, role: Role, session: UserSession) {
    session.user = { id, email, role };
  }
}
