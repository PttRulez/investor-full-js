import { Body, Controller, Patch, Post } from '@nestjs/common';
import { CashoutService } from './cashout.service';
import { CreateCashoutDto, UpdateCashoutDto } from './dto';

@Controller('cashout')
export class CashoutController {
  constructor(private cashoutService: CashoutService) {}

  @Post()
  createCashout(@Body() dto: CreateCashoutDto) {
    return this.cashoutService.create({ ...dto });
  }

  @Patch()
  updateCashout(@Body() dto: UpdateCashoutDto) {
    return this.cashoutService.update({ ...dto });
  }
}
