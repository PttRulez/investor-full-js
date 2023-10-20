import { Module } from '@nestjs/common';
import { CashoutService } from './cashout.service';
import { CashoutController } from './cashout.controller';
import { CashoutRepository } from './cashout.repository';

@Module({
  providers: [CashoutService, CashoutRepository],
  controllers: [CashoutController],
})
export class CashoutModule {}
