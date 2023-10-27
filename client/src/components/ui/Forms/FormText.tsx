import { FC } from 'react';
import {Control, Controller, FieldPath, FieldValues} from 'react-hook-form';
import TextInput, { TextInputProps } from '../NonFormInputs/TextInput';

interface FormTextInputProps extends TextInputProps {
  control: Control;
  name: FieldPath<any>;
}

const FormText: FC<FormTextInputProps> = ({
  control,
  name,
  onChange,
  ...textInputProps
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextInput
          onChange={(value) => {
            field.onChange(value);
            if (onChange) {
              onChange(value);
            }
          }}
          {...textInputProps}
        />
      )}
    />
  );
};

export default FormText;
