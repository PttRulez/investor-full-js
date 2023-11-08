import { TransactionType } from '../other/enums';

export interface ITransactionResponse {
	id: number;
	amount: number;
	type: TransactionType;
	date: Date;
}

export interface ICashoutResponse extends ITransactionResponse {
	type: TransactionType.CASHOUT
}

export interface IDepositResponse extends ITransactionResponse {
	type: TransactionType.DEPOSIT
}