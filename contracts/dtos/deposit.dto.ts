import { PartialType } from '@nestjs/mapped-types';
import { IsDateString, IsNumber } from 'class-validator';

export class CreateDepositDto {
  @IsNumber()
  amount: number;

  @IsDateString()
  date: Date;

  @IsNumber()
  portfolioId: number;
}

export class UpdateDepositDto extends PartialType(CreateDepositDto) {
  @IsNumber()
  id: number;
}
