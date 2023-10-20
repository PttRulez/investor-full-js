export type CreateCashoutData = {
  portfolioId: number;
  amount: number;
  date: Date;
};

export type UpdateCashoutData = Partial<CreateCashoutData> &
  Record<'id', number>;
