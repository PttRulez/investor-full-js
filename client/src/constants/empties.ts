import dayjs from 'dayjs';



export const emptyDeal: Deal = {
  id: 0,
  amount: 1,
  board: '',
  date: dayjs().format('YYYY-MM-DD'),
  exchangeName: '',
  name: '',
  portfolioId: 0,
  price: 0,
  ticker: '',
  stockType: '',
};
