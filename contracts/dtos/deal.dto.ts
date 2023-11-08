import { DealType, Exchange, SecurityType } from '../other/enums';
import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDealDto {
  @IsNumber()
  amount: number;

  @IsDateString()
  date: Date;

  @IsEnum(Exchange)
  exchange: Exchange;

  // @IsBoolean()
  // isDto: boolean;
  
  @IsNumber()
  portfolioId: number;
  
  @IsNumber()
  price: number;
  
  @IsEnum(SecurityType)
  secType: SecurityType
  
  @IsString()
  @IsNotEmpty()
  ticker: string;

  @IsEnum(DealType)
  type: DealType;
}

export class UpdateDealDto extends PartialType(CreateDealDto) {
  @IsNumber()
  id: number;
}
