import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import SelectInput, { SelectProps } from '../NonFormInputs/SelectInput';
import { SelectChangeEvent } from '@mui/material';

interface FormSelectProps extends SelectProps {
  control: Control;
  name: string;
}

const FormSelect: FC<FormSelectProps> = ({
  control,
  name,
  onChange,
  ...selectProps
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <SelectInput
          onChange={(e: SelectChangeEvent) => {
            field.onChange(e);
            if (onChange) {
              onChange(e);
            }
          }}
          {...selectProps}
        />
      )}
    />
  );
};

export default FormSelect;
