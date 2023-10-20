export type CreateDepositData = {
  portfolioId: number;
  amount: number;
  date: Date;
};

export type UpdateDepositData = Partial<CreateDepositData> &
  Record<'id', number>;
