import { FC } from 'react';
import DatePickerInput, {
  DatePickerProps,
} from '../NonFormInputs/DatePickerInput';
import { Control, Controller } from 'react-hook-form';

interface FormDatePickerProps extends DatePickerProps {
  control: Control;
  name: string;
}

const FormDatePicker: FC<FormDatePickerProps> = ({
  control,
  name,
  onChange,
  ...datePickerProps
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <DatePickerInput
          onChange={(value) => {
            field.onChange(value);
            if (onChange) {
              onChange(value);
            }
          }}
          {...datePickerProps}
        />
      )}
    />
  );
};

export default FormDatePicker;
