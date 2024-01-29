import { PartialType } from '@nestjs/mapped-types';
import { IsDateString, IsDecimal, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Exchange, OpinionType, SecurityType } from '../other/enums';

export class CreateOpinionDto {
	@IsDateString()
  date: Date;

	@IsEnum(Exchange)
	exchange: Exchange;

	@IsNumber()
	expertId: number;

	@IsString()
	text: string;

	@IsEnum(SecurityType)
	securityType: SecurityType;

	@IsNumber()
	securityId: number;

	@IsString()
	@IsOptional()
	sourceLink?: string;

	@IsOptional()
	@IsNumber()
	targetPrice: number;

	@IsEnum(OpinionType)
	type: OpinionType;

	// @IsNumber()
	// userId: number;
}

export class UpdateOpinionDto extends PartialType(CreateOpinionDto) {
  @IsNumber()
  id: number;
}

export class OpinionFilters {
	@IsEnum(Exchange)
	@IsOptional()
	exchange?: Exchange;

	@IsNumber()
	@IsOptional()
	expertId?: number;

	@IsEnum(SecurityType)
	@IsOptional()
	securityType?: SecurityType;

	@IsNumber()
	@IsOptional()
	securityId?: number;

	@IsEnum(OpinionType)
	@IsOptional()
	type?: OpinionType;
}

