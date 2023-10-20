import { Body, Controller, Patch, Post } from '@nestjs/common';
import { DepositService } from './deposit.service';
import { CreateDepositDto, UpdateDepositDto } from './dto';

@Controller('deposit')
export class DepositController {
  constructor(private depositService: DepositService) {}

  @Post()
  createDeposit(@Body() dto: CreateDepositDto) {
    return this.depositService.create({ ...dto });
  }

  @Patch()
  updateDeposit(@Body() dto: UpdateDepositDto) {
    return this.depositService.update({ ...dto });
  }
}
