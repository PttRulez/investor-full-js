import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import SelectInput, { SelectProps } from '../NonFormInputs/SelectInput';

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
          onChange={(value) => {
            field.onChange(value);
            if (onChange) {
              onChange(value);
            }
          }}
          {...selectProps}
        />
      )}
    />
  );
};

export default FormSelect;
