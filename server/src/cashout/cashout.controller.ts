import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CashoutService } from './cashout.service';
import { CreateCashoutDto, UpdateCashoutDto } from '@contracts/dtos';
import { ICashoutResponse } from '@contracts/responses';

@Controller('cashout')
export class CashoutController {
  constructor(private cashoutService: CashoutService) {}

  @Post()
  async createCashout(
    @Body() dto: CreateCashoutDto,
  ): Promise<ICashoutResponse> {
    const cashoutModel = await this.cashoutService.create({ ...dto });
    return cashoutModel.toJSON();
  }

  @Patch()
  async updateCashout(
    @Body() dto: UpdateCashoutDto,
  ): Promise<ICashoutResponse> {
    const cashoutModel = await this.cashoutService.update({ ...dto });
    return cashoutModel.toJSON();
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async deleteCashout(@Param('id') id: string): Promise<ICashoutResponse> {
    const cashoutModel = await this.cashoutService.delete(parseInt(id));
    return cashoutModel.toJSON();
  }
}
