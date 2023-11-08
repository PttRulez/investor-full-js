import AdvancedTable, {
  AdvancedTableColumn,
} from '@/components/ui/AdvancedTable/AdvancedTable';
import dayjs from '@/dayjs.config';
import {
  ITransactionResponse,
  ICashoutResponse,
  IDealResponse,
  IDepositResponse,
} from '@contracts/responses';
import { IconButton } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import investorService from '@/axios/investor/investor.service';
import CloseIcon from '@mui/icons-material/Close';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { DealType, TransactionType } from '@contracts/other/enums';

type Props = {
  portfolioId: number;
  transactions: ITransactionResponse[];
};

const TransactionsTable = ({ portfolioId, transactions }: Props) => {
  const client = useQueryClient();

  const deleteTransaction = useMutation(
    (transaction: ITransactionResponse): Promise<ITransactionResponse> => {
      if (transaction.type === TransactionType.CASHOUT) {
        return investorService.transaction.deleteCashout(transaction.id);
      } else {
        return investorService.transaction.deleteDeposit(transaction.id);
      }
    },
    {
      onSuccess: transaction => {
        client.invalidateQueries({
          queryKey: ['portfolio', portfolioId],
        });
      },
    },
  );

  const columns: AdvancedTableColumn<ITransactionResponse>[] = [
    {
      label: 'Тип',
      name: 'type',
      render: (value: TransactionType) =>
        value === TransactionType.CASHOUT ? (
          <ArrowCircleUpIcon sx={{ color: 'green' }} />
        ) : (
          <ArrowCircleDownIcon sx={{ color: 'red' }} />
        ),
    },
    {
      label: 'Сумма',
      name: 'amount',
    },
    {
      label: 'Дата',
      name: 'date',
      format: value => dayjs(value).format('DD MMMM YYYY'),
    },
    {
      label: '',
      name: 'actions',
      render: (_, transaction) => {
        return (
          <IconButton
            onClick={(e: React.SyntheticEvent) => {
              e.stopPropagation();
              deleteTransaction.mutate(transaction);
            }}
          >
            <CloseIcon sx={{ color: 'error.main' }} />
          </IconButton>
        );
      },
    },
  ];

  return <AdvancedTable rows={transactions} columns={columns} />;
};

export default TransactionsTable;
