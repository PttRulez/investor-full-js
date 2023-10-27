import { ChangeEvent, FC } from 'react';
import CheckboxInput, {
  CheckboxInputProps,
} from '../NonFormInputs/CheckboxInput';
import { Control, Controller } from 'react-hook-form';

interface FormCheckBoxProps extends CheckboxInputProps {
  control: Control;
  name: string;
}

const FormCheckBox: FC<FormCheckBoxProps> = ({
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
        <CheckboxInput
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
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

export default FormCheckBox;
