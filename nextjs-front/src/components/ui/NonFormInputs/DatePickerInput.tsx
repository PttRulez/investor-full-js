import {FC} from 'react';
import {DesktopDatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {IconButton, TextField} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ru';
import dayjs from "@/dayjs.config";

export interface DatePickerProps {
  error?: boolean;
  handleClear: () => void;
  onChange: (value: any, keyboardInputValue?: string | undefined) => void;
  label: string;
  value: any;
  variant?: 'standard' | 'filled' | 'outlined' | undefined;
}

const DatePickerInput: FC<DatePickerProps> = ({
                                                error = false,
                                                handleClear,
                                                label,
                                                onChange,
                                                value,
                                                variant = 'standard',
                                                ...otherProps
                                              }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ru'>
      <DesktopDatePicker
        label={label}
        onChange={(v) => {
          if (v) {
            onChange(v.set('hours', 11));
          }
          onChange(v);
        }}
        value={dayjs(value)}
        //@ts-ignore
        InputProps={{
          endAdornment: value && (
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClear}
            >
              <ClearIcon/>
            </IconButton>
          ),
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            error={error}
            variant={variant}
            sx={{
              '& .MuiInputBase-root.MuiInput-root': {paddingLeft: '15px'},
              '& label': {marginLeft: '15px'},
            }}
          />
        )}
        {...otherProps}
      />
    </LocalizationProvider>
  );
};

export default DatePickerInput;
