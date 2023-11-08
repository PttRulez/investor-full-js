import { SecurityType } from '../other/enums';

export enum MoexEngine {
  stock = 'stock',
  currency = 'currency'
}

export enum MoexMarket {
  shares = 'shares',
  bonds = 'bonds',
  index = 'index'
}

export enum MoexBoard {
  TQBR = 'TQBR',												// Т+: Акции и ДР - безадрес.
}

export enum MoexSecurityType {
  common_share = 'common_share', 				// 'акция обыкновенная'
  preferred_share = 'preferred_share', 	// 'акция привелигированная'
  
	corporate_bond = 'corporate_bond',		// 'корпоративная облигация'
  exchange_bond = 'exchange_bond', 			// 'облигация'
  ofz_bond = 'ofz_bond',								// 'ОФЗ'

  exchange_ppif = 'exchange_ppif', 			// 'биржевой ПИФ'
  public_ppif = 'public_ppif', 					// 'публичный ПИФ'
  stock_index_if = 'stock_index_if', 		// 'iNAV облигаций'

  futures = 'futures', 									// 'фьючерс'

  stock_index = 'stock_index',					// 'индекс'
}

export enum MoexSecurityGroup {
 	stock_index = 'stock_index',	                  // Индексы	
  stock_shares = 'stock_shares',	                // Акции	
  stock_bonds = 'stock_bonds',	                  // Облигации	
  currency_selt = 'currency_selt',	              // Валюта	
  futures_forts = 'futures_forts',	              // Фьючерсы	
  futures_options = 'futures_options',	          // Опционы	
  stock_dr	 = 'stock_dr',                        // Депозитарные расписки	
  stock_foreign_shares = 'stock_foreign_shares',	// Иностранные ц.б.	
  stock_eurobond = 'stock_eurobond',	            // Еврооблигации	
  stock_ppif = 'stock_ppif',	                    // Паи ПИФов	
  stock_etf	= 'stock_etf',                        // Биржевые фонды	
  currency_metal = 'currency_metal',	            // Драгоценные металлы	
  stock_qnv = 'stock_qnv',	                      // Квал. инвесторы	
  stock_gcc = 'stock_gcc',	                      // Клиринговые сертификаты участия	
  stock_deposit = 'stock_deposit',	              // Депозиты с ЦК	
  currency_futures = 'currency_futures',	        // Валютный фьючерс	
  currency_indices = 'currency_indices',	        // Валютные фиксинги	
  stock_mortgage = 'stock_mortgage'	              // Ипотечный сертификат	
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