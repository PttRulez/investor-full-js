import SelectInput, {
  SelectProps,
} from '@/components/ui/NonFormInputs/SelectInput';
import { DealType } from '@contracts/other/enums';
import { IPositionResponse } from '@contracts/responses';
import { SelectChangeEvent } from '@mui/material';
import { MRT_TableInstance } from 'material-react-table';

type Props = {
  onChooseTransaction: (e: SelectChangeEvent) => void;
  table: MRT_TableInstance<IPositionResponse>;
};

export enum PortfolioTransactionsMap {
  buy = 'buy',
  cashout = 'cashout',
  deposit = 'deposit',
  sell = 'cassellhout',
}

const PortfolioTableToolbar = ({ onChooseTransaction, table }: Props) => {
  return (
    <>
      <SelectInput
        sx={{
          minWidth: '200px',
        }}
        onChange={onChooseTransaction}
        label={'Добавить'}
        options={[
          { id: PortfolioTransactionsMap.buy, name: 'Покупка' },
          { id: PortfolioTransactionsMap.sell, name: 'Продажа' },
          { id: PortfolioTransactionsMap.deposit, name: 'Депозит' },
          { id: PortfolioTransactionsMap.cashout, name: 'Кэшаут' },
        ]}
      />
    </>
  );
};

export default PortfolioTableToolbar;
