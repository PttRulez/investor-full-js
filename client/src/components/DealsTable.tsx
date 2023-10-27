import AdvancedTable, {
  AdvancedTableColumn,
} from '@/components/ui/AdvancedTable/AdvancedTable';
import dayjs from '@/dayjs.config';
import { useEffect } from 'react';
import investorService from '@/axios/investor';
import { moexService } from '@/axios/moex/moex.service';

const DealsTable = ({ deals }) => {
  const columns: AdvancedTableColumn[] = [
    {
      label: 'Тикер',
      name: 'ticker',
    },
    {
      label: 'Кол-во',
      name: 'amount',
    },
    {
      label: 'Цена',
      name: 'price',
    },
    {
      label: 'Сумма',
      name: 'total',
      format: (_, deal) => deal.price * deal.amount,
    },
    {
      label: 'Дата',
      name: 'date',
      format: (value) => dayjs(value).format('DD MMMM YYYY'),
    },
  ];

  // useEffect(() => {
  //   moexService.getAllShares().then(res => console.log('res', res))
  // })

  return <AdvancedTable rows={deals} columns={columns} />;
};

export default DealsTable;
