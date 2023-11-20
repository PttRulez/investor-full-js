import { SubmitHandler, useForm } from 'react-hook-form';
import { CashoutSchema, CashoutSchemaType } from './validation-schema';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import FormText from '@/components/ui/Forms/FormText';
import FormDatePicker from '@/components/ui/Forms/FormDatePicker';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateCashoutDto } from '@contracts/dtos';
import investorService from '@/axios/investor/investor.service';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';

type Props = {
  afterSuccessfulSubmit: () => void;
  portfolioId: number;
};

const CashoutForm = ({ afterSuccessfulSubmit, portfolioId }: Props) => {
  const client = useQueryClient();
  const { control, formState, handleSubmit, resetField, setValue, watch } =
    useForm<CashoutSchemaType>({
      defaultValues: {
        amount: undefined,
        date: dayjs().toDate(),
        portfolioId,
      },
      resolver: zodResolver(CashoutSchema),
    });

  const watchAll = watch();

  const createCashout = useMutation(
    (formData: CreateCashoutDto) =>
      investorService.transaction.createCashout(formData),
    {
      onSuccess: cashout => {
        afterSuccessfulSubmit();
        client.invalidateQueries({ queryKey: ['portfolio', portfolioId] });
      },
    },
  );

  const onSubmit: SubmitHandler<CashoutSchemaType> = data => {
    createCashout.mutate(data);
  };

  return (
    <Box
      onSubmit={handleSubmit(onSubmit)}
      component="form"
      sx={{ padding: '30px' }}
    >
      <Stack gap={'20px'}>
        <FormText
          control={control}
          error={!!formState.errors.amount}
          handleClear={() => resetField('amount')}
          helperText={formState.errors.amount?.message}
          label={'Сумма кэшаута'}
          name={'amount'}
          type="number"
          value={watchAll.amount}
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
          label={'Дата кэшаута'}
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

export default CashoutForm;
