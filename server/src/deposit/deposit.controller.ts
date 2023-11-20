import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { DepositService } from './deposit.service';
import { CreateDepositDto, UpdateDepositDto } from '@contracts/dtos';
import { IDepositResponse } from '@contracts/responses';

@Controller('deposit')
export class DepositController {
  constructor(private depositService: DepositService) {}

  @Post()
  async createDeposit(
    @Body() dto: CreateDepositDto,
  ): Promise<IDepositResponse> {
    const cashoutModel = await this.depositService.create({ ...dto });
    return cashoutModel.toJSON();
  }

  @Patch()
  async updateDeposit(
    @Body() dto: UpdateDepositDto,
  ): Promise<IDepositResponse> {
    const cashoutModel = await this.depositService.update({ ...dto });
    return cashoutModel.toJSON();
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async deleteCashout(@Param('id') id: string): Promise<IDepositResponse> {
    const cashoutModel = await this.depositService.delete(parseInt(id));
    return cashoutModel.toJSON();
  }
}
