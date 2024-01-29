import { IsString } from 'class-validator';

export class GetMoexBondDto {
	@IsString()
	ticker: string;
}