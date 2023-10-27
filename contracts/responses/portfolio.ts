import { IDepositResponse } from './deposit';
import { IDealResponse } from './deal';
import { ICashoutResponse } from './cashout';
import { SecurityResponse } from './security';

// export type StockType = string;
// export type IPositionsResponse = Record<string, IPositionResponse[]>;

export interface IPortfolioResponse {
	cashouts: ICashoutResponse[];
	cashoutsSum: number;
	compound: boolean;
	deals: IDealResponse[];
	deposits: IDepositResponse[];
	depositsSum: number;
	id: number;
	name: string;
	positions: IPortfolioPositionsResponse;
	profitability: string;
	total: number;
}

export interface IPositionResponse {
	amount: number;
	currentPrice: number;
	// profitability: number;
	// averagePrice: number;
	security: SecurityResponse;
	total: number;
}

export type IPortfolioPositionsResponse = { shares: Record<string, IPositionResponse>; bonds: Record<string, IPositionResponse> }