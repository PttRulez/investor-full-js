import { MoexBoard, MoexSecurityGroup, MoexSecurityType } from '@contracts/responses';
import { AutocompleteChangeDetails, AutocompleteChangeReason } from '@mui/material';

export type MoexSearchHandler = (
  event: React.SyntheticEvent,
  value: Record<string, any> | null | Array<Record<string, any> | null>,
  reason: AutocompleteChangeReason,
  details?: AutocompleteChangeDetails<Record<string, any>>,
) => void;

export type MoexSearchAutocompleteOption = {
  board: MoexBoard;
  group: MoexSecurityGroup;
  jsxKey: string;
  name: string;
  shortName: string;
  ticker: string;
  type: MoexSecurityType;
};
