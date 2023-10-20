export type Portfolio = {
  id: number;
  name: string;
  compound: boolean;
  deposits: DepositResponse[];
  cashouts: CashoutResponse[];
  deals: DealResponse[];
};

export type DepositResponse = {
  id: number;
  amount: number;
  date: Date;
};

export type CashoutResponse = {
  id: number;
  amount: number;
  date: Date;
};

export type DealResponse = {
  id: number;
};
