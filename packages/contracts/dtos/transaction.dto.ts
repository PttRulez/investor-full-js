import { PartialType } from '@nestjs/mapped-types';
import { IsDateString, IsEnum, IsNumber } from 'class-validator';
import { TransactionType } from '../other/enums';

export class CreateTransactionDto {
  @IsNumber()
  amount: number;

  @IsDateString()
  date: Date;

  @IsNumber()
  portfolioId: number;

  @IsEnum(TransactionType)
  type: TransactionType;
}
export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
  @IsNumber()
  id: number;
}
