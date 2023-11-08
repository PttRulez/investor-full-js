import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreatePortfolioDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  compound: boolean;
}

export class UpdatePortfolioDto extends PartialType(CreatePortfolioDto) {}
