import { IDealResponse } from './deal';
import { ICashoutResponse, IDepositResponse, ITransactionResponse } from './transaction';
import { SecurityResponse } from './security';


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
	transactions: ITransactionResponse[]
}

export type IPortfolioListResponse = Pick<IPortfolioResponse,'id' | 'name' | 'compound'>;

export interface IPositionResponse {
	amount: number;
	currentPrice: number;
	security: SecurityResponse;
	total: number;
}

export interface IPortfolioPositionsResponse {
	allPositions: Array<IPositionResponse>;
	sharePositions: Array<IPositionResponse>;
	sharesTotal: number;
 	bondPositions: Array<IPositionResponse>;
	bondsTotal: number
}