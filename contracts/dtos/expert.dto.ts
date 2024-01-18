import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateExpertDto {
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsString()
  name: string;
}

export class UpdateExpertDto extends PartialType(CreateExpertDto) {
  @IsNumber()
  id: number;
}

