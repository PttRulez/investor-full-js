import { PartialType } from '@nestjs/mapped-types';
import { IsDateString, IsNumber } from 'class-validator';

export class CreateCashoutDto {
  @IsNumber()
  amount: number;

  @IsDateString()
  date: Date;

  @IsNumber()
  portfolioId: number;
}
export class UpdateCashoutDto extends PartialType(CreateCashoutDto) {
  @IsNumber()
  id: number;
}
