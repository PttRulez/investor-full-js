import { Module } from '@nestjs/common';
import { PortfolioModule } from './portfolio/portfolio.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { SessionGuard } from './auth/guards';
import { UserModule } from './user/user.module';
import { AdminGuard } from './auth/guards/admin.guard';
import { DepositModule } from './deposit/deposit.module';
import { CashoutModule } from './cashout/cashout.module';
import { DealModule } from './deal/deal.module';
import { MoexModule } from './moex/moex.module';
import { GlobalHttpModule as HttpModule } from './http/http.module';

const reflector = new Reflector();

@Module({
  imports: [
    AuthModule,
    CashoutModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DealModule,
    DepositModule,
    HttpModule,
    MoexModule,
    PortfolioModule,
    PrismaModule,
    UserModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useValue: new SessionGuard(reflector),
    },
    {
      provide: APP_GUARD,
      useValue: new AdminGuard(reflector),
    },
  ],
})
export class AppModule {}
