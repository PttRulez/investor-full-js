import { Exchange, DealType } from '../other/enums'

export interface IDealResponse {
	amount: number;
	date: Date;
	exchange: Exchange;
	id: number;
	portfolioId: number;
  price: number;
	securityId: number;
  type: DealType;
}

export interface ICreateDeal {
	amount: number;
	date: Date;
	exchange: Exchange;
	portfolioId: number;
	price: number;
	ticker: string;
	type: DealType;
}

export interface IUpdateDeal extends Partial<ICreateDeal> {
	id: number;
}