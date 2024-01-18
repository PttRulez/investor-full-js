import { SubmitHandler, useForm } from 'react-hook-form';
import { ExpertSchema, ExpertSchemaType } from './validation-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import investorService from '@/axios/investor/investor.service';
import { CreateExpertDto } from '@contracts/index';
import DefaultFormBox from '@/components/ui/Forms/DefaultFormBox';
import FormText from '@/components/ui/Forms/FormText';
import { Button } from '@mui/material';

interface ExpertFormProps {
  afterSuccessfulSubmit: () => void;
}

const ExpertForm = ({ afterSuccessfulSubmit }: ExpertFormProps) => {
  const {
    clearErrors,
    control,
    formState,
    handleSubmit,
    resetField,
    setValue,
    watch,
  } = useForm<ExpertSchemaType>({
    defaultValues: {
      avatarUrl: undefined,
      name: undefined,
    },
    resolver: zodResolver(ExpertSchema),
  });

  const watchAll = watch();
  // const client = useQueryClient();

  const createExpert = useMutation(
    (formData: CreateExpertDto) =>
      investorService.expert.createExpert(formData),
    {
      onSuccess: expert => {
        afterSuccessfulSubmit();
        // client.invalidateQueries({
        //   queryKey: ['portfolio', expert.id],
        // });
      },
    },
  );

  const onSubmit: SubmitHandler<ExpertSchemaType> = data => {
    createExpert.mutate(data);
  };

  return (
    <DefaultFormBox onSubmit={handleSubmit(onSubmit)}>
      <FormText
        control={control}
        error={!!formState.errors.name}
        handleClear={() => setValue('name', '')}
        helperText={formState.errors.name?.message}
        label={'Имя эксперта'}
        name={'name'}
        value={watchAll.name}
      />
      <FormText
        control={control}
        error={!!formState.errors.avatarUrl}
        handleClear={() => setValue('avatarUrl', undefined)}
        helperText={formState.errors.avatarUrl?.message}
        label={'Ссылка на аватарку'}
        name={'avatarUrl'}
        value={watchAll.avatarUrl}
      />
      <Button
        variant="outlined"
        color="primary"
        type="submit"
        sx={{ color: 'grey.700' }}
      >
        Сохранить
      </Button>
    </DefaultFormBox>
  );
};

export default ExpertForm;
