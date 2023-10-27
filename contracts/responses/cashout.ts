export interface ICashoutResponse {
	id: number;
	amount: number;
	date: Date;
}

export interface ICreateCashout {
	amount: number;
	date: Date;
	portfolioId: number;
}

export interface IUpdateCashout extends Partial<ICreateCashout> {
	id: number;
}