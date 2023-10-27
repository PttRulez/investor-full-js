import { SecurityType } from '../other/enums';

export enum MoexEngine {
  stock = 'stock',
  currency = 'currency'
}

export enum MoexMarket {
  shares = 'shares',
  bonds = 'bonds'
}

export enum MoexBoard {
  TQBR = 'TQBR',												// Т+: Акции и ДР - безадрес.
}

export enum MoexStockType {
  stock_index_if = 'stock_index_if', 		// 'iNAV облигаций'
  common_share = 'common_share', 				// 'акция обыкновенная'
  exchange_bond = 'exchange_bond', 			// 'облигация'
  preferred_share = 'preferred_share', 	// 'акция привелигированная'
	corporate_bond = 'corporate_bond',		// 'корпоративная облигация'
  ofz_bond = 'ofz_bond',								// 'ОФЗ'
  futures = 'futures', 									// 'фьючерс'
  public_ppif = 'public_ppif', 					// 'публичный ПИФ'
  exchange_ppif = 'exchange_ppif', 			// 'биржевой ПИФ'
  stock_index = 'stock_index',					// 'индекс'
}

export interface IMoexSecurtiyResponse {
	board: MoexBoard;
  engine: MoexEngine;
  id: number;
  market: MoexMarket;
  name: string;
  shortName: string;
  securityType: SecurityType;
	ticker: string;
}