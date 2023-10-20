import { moexStockTypes } from '@/constants/moex';
import { AutocompleteChangeDetails } from '@mui/material';

export type MoexSearchHandler = (
  event: React.SyntheticEvent,
  value: Record<string, any> | null | Array<Record<string, any> | null>,
  reason: string,
  details?: AutocompleteChangeDetails<Record<string, any>>
) => void;

export type MoexSearchAutocompleteOption = {
  jsxKey: number;
  id: string;
  label: string;
  type: keyof typeof moexStockTypes;
  group: string;
  primary_boardid: string;
};
