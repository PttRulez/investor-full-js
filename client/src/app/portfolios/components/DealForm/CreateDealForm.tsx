'use client';

import { Box, Button, Stack } from '@mui/material';
import FormText from '@/components/ui/Forms/FormText';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FC, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import MoexSearch from '@/components/ui/StocksSearch/MoexSearch';
import FormDatePicker from '@/components/ui/Forms/FormDatePicker';
import investorService from '@/axios/investor/investor.service';
import { CreateDealDto } from '@contracts/dtos';
import dayjs from 'dayjs';
import { MoexSearchAutocompleteOption } from '@/components/ui/StocksSearch/types';
import { DealType, Exchange } from '@contracts/other/enums';
import { getSecurityTypeFromMoexSecType } from '@/utils/helpers';
import { DealSchema, DealSchemaType } from './validation-schema';
import { zodResolver } from '@hookform/resolvers/zod';

interface DealFormProps {
  afterSuccessfulSubmit: () => void;
  dealType: DealType;
  portfolioId: number;
}

const CreateDealForm: FC<DealFormProps> = ({
  afterSuccessfulSubmit,
  dealType,
  portfolioId,
}) => {
  const {
    clearErrors,
    control,
    formState,
    handleSubmit,
    resetField,
    setValue,
    watch,
  } = useForm<DealSchemaType>({
    defaultValues: {
      date: dayjs().toDate(),
      portfolioId,
      type: dealType,
      secType: undefined,
      exchange: undefined,
      ticker: undefined,
    },
    resolver: zodResolver(DealSchema),
  });
  const watchAll = watch();
  const client = useQueryClient();

  const changeMoexSecurityHandler = (
    value: MoexSearchAutocompleteOption | null,
  ) => {
    if (value) {
      setValue('exchange', Exchange.MOEX);
      setValue('secType', getSecurityTypeFromMoexSecType(value.type));
      setValue('ticker', value.ticker);
      clearErrors('ticker');
    } else {
      resetField('ticker');
    }
  };

  const createDeal = useMutation(
    (formData: CreateDealDto) => investorService.deal.createDeal(formData),
    {
      onSuccess: deal => {
        afterSuccessfulSubmit();
        client.invalidateQueries({ queryKey: ['portfolio', deal.portfolioId] });
      },
    },
  );

  const onSubmit: SubmitHandler<DealSchemaType> = data => {
    createDeal.mutate(data);
  };
  useEffect(() => {
    console.log('[formState.errors]:', formState.errors);
  }, [formState.errors]);
  return (
    <Box
      onSubmit={handleSubmit(onSubmit)}
      component="form"
      sx={{ padding: '10px', minHeight: '700px' }}
    >
      <Stack gap={'20px'}>
        <Controller
          control={control}
          name="ticker"
          render={({ field }) => (
            <MoexSearch
              onChange={(e, value) => {
                // field.onChange(e);
                changeMoexSecurityHandler(value);
              }}
              error={!!formState.errors.ticker}
              helperText={formState.errors.ticker?.message}
            />
          )}
        />
        <FormText
          control={control}
          error={!!formState.errors.amount}
          handleClear={() => setValue('amount', 0)}
          helperText={formState.errors.amount?.message}
          label={'Кол-во бумаг'}
          name={'amount'}
          type="number"
          value={watchAll.amount}
        />
        <FormText
          control={control}
          decimal
          error={!!formState.errors.price}
          handleClear={() => setValue('price', 0)}
          helperText={formState.errors.price?.message}
          label={'Цена покупки'}
          name={'price'}
          type="number"
          value={watchAll.price}
        />
        <FormDatePicker
          control={control}
          name={'date'}
          handleClear={() => resetField('date')}
          onChange={newValue => {
            if (newValue) {
              setValue('date', newValue?.toDate());
            } else {
              resetField('date');
            }
          }}
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

export default CreateDealForm;
