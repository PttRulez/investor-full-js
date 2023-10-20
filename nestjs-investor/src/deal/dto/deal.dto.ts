import { PartialType } from '@nestjs/mapped-types';
import { DealType } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Exchange } from 'src/common/enums';

export class CreateDealDto {
  @IsString()
  @IsNotEmpty()
  ticker: string;

  @IsEnum(Exchange)
  exchange: Exchange;

  @IsNumber()
  amount: number;

  @IsNumber()
  price: number;

  @IsEnum(DealType)
  type: DealType;

  @IsDateString()
  date: Date;

  @IsNumber()
  portfolioId: number;
}

export class UpdateDepositDto extends PartialType(CreateDealDto) {
  @IsNumber()
  id: number;
}
