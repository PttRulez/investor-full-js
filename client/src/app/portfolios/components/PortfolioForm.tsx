'use client';
import { Box, Button, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import FormText from '@/components/ui/Forms/FormText';
import FormCheckBox from '@/components/ui/Forms/FormCheckBox';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import investorService from '@/axios/investor/investor.service';
import { CreatePortfolioDto, UpdatePortfolioDto } from '@contracts/dtos';

interface PortfolioFormProps {
  portfolio: CreatePortfolioDto | UpdatePortfolioDto;
  afterSuccessfulSubmit: () => void;
}

export default function PortfolioForm({
  portfolio,
  afterSuccessfulSubmit,
}: PortfolioFormProps) {
  const { control, handleSubmit, setValue, watch } = useForm<
    CreatePortfolioDto | UpdatePortfolioDto
  >({
    defaultValues: portfolio,
  });
  const watchAll = watch();
  const client = useQueryClient();

  const createPortfolio = useMutation(
    (formData: CreatePortfolioDto) =>
      investorService.portfolio.createPortfolio(formData),
    {
      onSuccess: () => {
        afterSuccessfulSubmit();
        client.invalidateQueries(['allPortfolios']);
      },
    },
  );

  const updatePortfolio = useMutation(
    (formData: UpdatePortfolioDto) =>
      investorService.portfolio.updatePortfolio(formData),
    {
      onSuccess: () => {
        afterSuccessfulSubmit();
        client.invalidateQueries(['allPortfolios']);
      },
    },
  );

  const onSubmit = (formData: CreatePortfolioDto | UpdatePortfolioDto) => {
    if (!('id' in formData)) {
      createPortfolio.mutate(formData);
    } else {
      updatePortfolio.mutate({
        compound: formData.compound,
        name: formData.name,
        id: formData.id,
      });
    }
  };

  return (
    <Box onSubmit={handleSubmit(onSubmit)} sx={{ backgroundColor: 'white' }}>
      <Stack component="form" gap="20px">
        <FormText
          // @ts-ignore
          control={control}
          name="name"
          label="Название"
          value={watchAll.name}
          handleClear={() => setValue('name', '')}
        />
        <FormCheckBox
          // @ts-ignore
          control={control}
          name="compound"
          label="Составной"
          checked={watchAll.compound}
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
}
