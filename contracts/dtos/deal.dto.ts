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

  @IsBoolean()
  isDto: boolean;
  
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

const a: CreateDealDto = {
  amount: 100,
  date: new Date('12-02-2023'),
  exchange: Exchange.MOEX,
  isDto: true,
  portfolioId: 1,
  price: 25.67,
  secType: SecurityType.SHARE,
  ticker: 'SBERP',
  type: DealType.BUY,
};

const b: UpdateDealDto = {
  id: 2,
  price: 22.3,
};

console.log(a, b);
