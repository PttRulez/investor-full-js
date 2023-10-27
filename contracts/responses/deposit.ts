export interface IDepositResponse {
	id: number;
	amount: number;
	date: Date;
}

export interface ICreateDeposit {
	amount: number;
	date: Date;
	portfolioId: number;
}

export interface IUpdateDeposit extends Partial<ICreateDeposit> {
	id: number;
}