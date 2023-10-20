'use client';
import { FC, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, {
  AutocompleteInputChangeReason,
} from '@mui/material/Autocomplete';
import useDebounce from '@/hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';
import { moexService } from '@/axios/moex/moex.service';
import { Box, Typography } from '@mui/material';
import { moexStockTypes } from '@/constants/moex';
import { MoexSearchAutocompleteOption, MoexSearchHandler } from './types';

export interface IStockSearch {
  // searchTerm: string;
  // handleSubmit?: FormEventHandler<HTMLFormElement> | undefined;
  handleChange?: MoexSearchHandler;
}

const MoexSearch: FC<IStockSearch> = ({ handleChange, ...otherProps }) => {
  const [submittedTicker, setSubmittedTicker] = useState<string>('');
  const debouncedValue = useDebounce<string>(submittedTicker, 500);

  const { data: stocksOptions, refetch } = useQuery<
    Record<string, any>,
    Error,
    Record<string, any>[]
  >({
    queryKey: ['search', debouncedValue],
    queryFn: ({ queryKey }) => moexService.search(queryKey[1] as string),
    enabled: false,
    select: (data) => {
      return data.securities.data.map(
        (sec: any) =>
          ({
            jsxKey: sec[0],
            id: sec[1],
            label: sec[2],
            type: sec.at(-4),
            group: sec.at(-3),
            primary_boardid: sec.at(-2),
          } satisfies MoexSearchAutocompleteOption)
      );
    },
  });

  useEffect(() => {
    if (debouncedValue) {
      refetch();
    }
  }, [debouncedValue]);

  const inputHandler = (
    e: React.SyntheticEvent,
    value: string,
    reason: AutocompleteInputChangeReason
  ) => {
    if (reason === 'input' && value) {
      setSubmittedTicker(value);
    }
  };

  const typesUnique = new Set();
  if (stocksOptions) {
    for (const sec of stocksOptions) {
      typesUnique.add(sec.group);
    }
  }

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={stocksOptions ?? []}
      onInputChange={inputHandler}
      onChange={handleChange}
      renderOption={(props, option) => {
        return (
          <Box component="li" {...props} key={option.jsxKey}>
            {option.label}{' '}
            <Typography
              variant="body1"
              sx={{ fontStyle: 'italic', color: 'grey.500' }}
            >
              -{' '}
              {
                moexStockTypes[
                  option.type as MoexSearchAutocompleteOption['type']
                ]
              }
            </Typography>
          </Box>
        );
      }}
      // getOptionLabel={(option) => option.name ? `${option.symbol} - ${option.name}` : ""}
      sx={{ minWidth: 500 }}
      // @ts-ignore
      renderInput={(params) => (
        <TextField {...params} label={'Название бумаги'} />
      )}
      {...otherProps}
    />
  );
};

export default MoexSearch;
