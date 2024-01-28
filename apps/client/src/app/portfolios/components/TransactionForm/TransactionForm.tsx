import { SubmitHandler, useForm } from 'react-hook-form';
import { TransactionSchema, TransactionSchemaType } from './validation-schema';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import FormText from '@/components/ui/Forms/FormText';
import FormDatePicker from '@/components/ui/Forms/FormDatePicker';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateTransactionDto, TransactionType } from 'contracts';
import investorService from '@/axios/investor/investor.service';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import FormSelect from '@/components/ui/Forms/FormSelect';

type Props = {
  afterSuccessfulSubmit: () => void;
  portfolioId: number;
};

const TransactionForm = ({ afterSuccessfulSubmit, portfolioId }: Props) => {
  const client = useQueryClient();
  const { control, formState, handleSubmit, resetField, setValue, watch } =
    useForm<TransactionSchemaType>({
      defaultValues: {
        amount: undefined,
        date: dayjs().toDate(),
        portfolioId,
        type: undefined,
      },
      resolver: zodResolver(TransactionSchema),
    });

  const watchAll = watch();

  const createTransaction = useMutation(
    (formData: CreateTransactionDto) =>
      investorService.transaction.createTransaction(formData),
    {
      onSuccess: cashout => {
        afterSuccessfulSubmit();
        client.invalidateQueries({ queryKey: ['portfolio', portfolioId] });
      },
    },
  );

  const onSubmit: SubmitHandler<TransactionSchemaType> = data => {
    createTransaction.mutate(data);
  };

  return (
    <Box
      onSubmit={handleSubmit(onSubmit)}
      component="form"
      sx={{ padding: '30px' }}
    >
      <Stack gap={'20px'}>
        <FormSelect
          control={control}
          name={'type'}
          label="Кэш или деп ?"
          options={{
            [TransactionType.CASHOUT]: 'Кэшаут',
            [TransactionType.DEPOSIT]: 'Депозит',
          }}
          value={watchAll.type}
        />
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

export default TransactionForm;
