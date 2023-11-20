import { SubmitHandler, useForm } from 'react-hook-form';
import { DepositSchema, DepositSchemaType } from './validation-schema';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import FormText from '@/components/ui/Forms/FormText';
import FormDatePicker from '@/components/ui/Forms/FormDatePicker';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateDepositDto } from '@contracts/dtos';
import investorService from '@/axios/investor/investor.service';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';

type Props = {
  afterSuccessfulSubmit: () => void;
  portfolioId: number;
};

const DepositForm = ({ afterSuccessfulSubmit, portfolioId }: Props) => {
  const client = useQueryClient();
  const { control, formState, handleSubmit, resetField, setValue, watch } =
    useForm<DepositSchemaType>({
      defaultValues: {
        amount: undefined,
        date: dayjs().toDate(),
        portfolioId,
      },
      resolver: zodResolver(DepositSchema),
    });

  const watchAll = watch();

  const createDeposit = useMutation(
    (formData: CreateDepositDto) =>
      investorService.transaction.createDeposit(formData),
    {
      onSuccess: deposit => {
        afterSuccessfulSubmit();
        client.invalidateQueries({ queryKey: ['portfolio', portfolioId] });
      },
    },
  );

  const onSubmit: SubmitHandler<DepositSchemaType> = data => {
    createDeposit.mutate(data);
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
          label={'Сумма депозита'}
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
          label={'Дата депозита'}
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

export default DepositForm;
