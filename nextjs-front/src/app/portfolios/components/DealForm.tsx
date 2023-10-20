'use client';

import { Box, Button, Stack } from '@mui/material';
import FormText from '@/components/ui/Forms/FormText';
import { useForm } from 'react-hook-form';
import { FC, useMemo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import MoexSearch from '@/components/ui/StocksSearch/MoexSearch';
import FormDatePicker from '@/components/ui/Forms/FormDatePicker';
import { StockTypes } from '@/constants/enums';
import investorService from '@/axios/investor';
import { moexStockTypeToGeneralType } from '@/constants/moex';

interface DealFormProps {
  deal: Deal;
  afterSuccessfulSubmit: () => void;
}

const DealForm: FC<DealFormProps> = ({ deal, afterSuccessfulSubmit }) => {
  const { control, handleSubmit, setValue, watch } = useForm<Deal>({
    defaultValues: deal,
  });
  const watchAll = watch();
  const client = useQueryClient();

  const changeHandler = (e, value: Deal, _) => {
    if (value) {
      setValue('ticker', value.id);
      setValue('name', value.label);
      setValue('exchangeName', 'MOEX');
      setValue('stockType', moexStockTypeToGeneralType[value.type]);
      setValue('board', value.primary_boardid);
    }
  };

  const stockTypes = useMemo(
    () => ({
      share: StockTypes.Share,
      bond: StockTypes.Bond,
    }),
    [],
  );

  const createDeal = useMutation(
    (formData: Deal) => investorService.createDeal(formData),
    {
      onSuccess: () => {
        afterSuccessfulSubmit();
        client.invalidateQueries({ queryKey: ['portfolio', deal.portfolioId] });
      },
    },
  );

  const updateDeal = useMutation(
    (formData: Deal) => investorService.updateDeal(formData),
    {
      onSuccess: () => {
        afterSuccessfulSubmit();
        client.invalidateQueries(['portfolio', +deal.portfolioId]);
      },
    },
  );

  const onSubmit = (data: Deal) => {
    if (data.id) {
      updateDeal.mutate(data);
    } else {
      createDeal.mutate(data);
    }
  };

  return (
    <Box
      onSubmit={handleSubmit(onSubmit)}
      component="form"
      sx={{ padding: '10px', minHeight: '700px' }}
    >
      <Stack gap={'20px'}>
        <MoexSearch
          //@ts-ignore
          label={'Бумага'}
          control={control}
          name={'ticker'}
          onChange={changeHandler}
        />
        <FormText
          type="number"
          //@ts-ignore
          control={control}
          label={'Кол-во бумаг'}
          name={'amount'}
          value={watchAll.amount}
        />
        <FormText
          type="number"
          //@ts-ignore
          control={control}
          label={'Цена покупки'}
          name={'price'}
          value={watchAll.price}
        />
        <FormDatePicker
          //@ts-ignore
          control={control}
          name={'date'}
          handleClear={() => setValue('date', '')}
          onChange={(newValue) => setValue('date', newValue)}
          label={'Дата покупки'}
          value={watchAll.date}
        />
        <Button
          variant="outlined"
          color="primary"
          type="submit"
          sx={{ color: 'grey.700' }}
        >
          Сохранить
        </Button>
      </Stack>
    </Box>
  );
};

export default DealForm;

// export interface Deal {
//   amount: number;
//   date: string;
//   exchangeName: string;
//   portfolioId: number;
//   price: number;
//   ticker: string;
//   stockType: string;
// }
