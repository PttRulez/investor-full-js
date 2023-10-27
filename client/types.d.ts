interface SxProp {
  [key: string]: string | number;
}

interface SelectList {
  [key: number | string]: string;
}

interface SelectOption {
  id: number | string;
  name: string | number;

  [key: string]: string | number;
}

interface Deal {
  id: number;
  amount: number;
  board: string;
  date: string;
  exchangeName: string;
  name: string;
  portfolioId: number;
  price: number;
  ticker: string;
  stockType: string;
}

interface Position {
  board: string;
  ticker: string;
  amount: number;
  price: number;
  currentPrice: number;
  total: number;
  stockType: string;
}
