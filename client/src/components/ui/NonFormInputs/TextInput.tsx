import { IconButton, TextField, TextFieldProps } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { styled } from '@mui/material/styles';

export type TextInputProps = TextFieldProps & {
  handleClear?: () => void;
  decimal?: boolean;
};

const StyledTextField = styled(TextField)(({ theme }) => ({
  // '& .MuiInput-root': {
  //   minHeight: '40px',
  // },
  '& .MuiInputBase-root.MuiInput-root': {
    paddingLeft: '20px',
    paddingRight: '20px',
  },
}));

const TextInput = ({
  decimal,
  label,
  handleClear,
  type,
  value,
  variant = 'standard',
  ...otherProps
}: TextInputProps) => {
  return (
    // <FormControl fullWidth>
    //   <InputLabel id={label}>{label}</InputLabel>
    <StyledTextField
      InputProps={{
        endAdornment: value ? (
          <IconButton onClick={handleClear}>
            <ClearIcon />
          </IconButton>
        ) : (
          ''
        ),
      }}
      label={<span style={{ marginLeft: '15px' }}>{label}</span>}
      type={type}
      value={value}
      variant={variant}
      {...otherProps}
    />
    // </FormControl>
  );
};

export default TextInput;
