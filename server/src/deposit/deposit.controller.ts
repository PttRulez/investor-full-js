import { Body, Controller, Patch, Post } from '@nestjs/common';
import { DepositService } from './deposit.service';
import { CreateDepositDto, UpdateDepositDto } from '@contracts/dtos';
import { IDepositResponse } from '@contracts/responses';

@Controller('deposit')
export class DepositController {
  constructor(private depositService: DepositService) {}

  @Post()
  createDeposit(@Body() dto: CreateDepositDto): Promise<IDepositResponse> {
    return this.depositService.create({ ...dto });
  }

  @Patch()
  updateDeposit(@Body() dto: UpdateDepositDto): Promise<IDepositResponse> {
    return this.depositService.update({ ...dto });
  }
}
