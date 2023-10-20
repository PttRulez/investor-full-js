import { Module } from '@nestjs/common';
import { DepositService } from './deposit.service';
import { DepositController } from './deposit.controller';
import { DepositRepository } from './deposit.repository';

@Module({
  providers: [DepositService, DepositRepository],
  controllers: [DepositController],
})
export class DepositModule {}
