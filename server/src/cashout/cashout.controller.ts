import { Body, Controller, Patch, Post } from '@nestjs/common';
import { CashoutService } from './cashout.service';
import { CreateCashoutDto, UpdateCashoutDto } from '@contracts/dtos';
import { ICashoutResponse } from '@contracts/responses/cashout';

@Controller('cashout')
export class CashoutController {
  constructor(private cashoutService: CashoutService) {}

  @Post()
  createCashout(@Body() dto: CreateCashoutDto): Promise<ICashoutResponse> {
    return this.cashoutService.create({ ...dto });
  }

  @Patch()
  updateCashout(@Body() dto: UpdateCashoutDto): Promise<ICashoutResponse> {
    return this.cashoutService.update({ ...dto });
  }
}
