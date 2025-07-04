import {
  FormControl,
  Select as BaseSelect,
  MenuItem,
  InputLabel,
} from "@mui/material";
import type { SelectProps } from "@mui/material";

type SelectPickerProps = SelectProps & {
  options: {
    label: string;
    value: number;
  }[];
};

const SelectPicker = ({ ...props }: SelectPickerProps) => {
  return (
    <FormControl fullWidth>
      <InputLabel id={props.id}>{props.label}</InputLabel>
      <BaseSelect
        labelId={props.id}
        id={props.id}
        value={props.value}
        label={props.label}
        onChange={props.onChange}
        defaultValue={props.defaultValue}
        {...props}
      >
        {props.options.map((option) => {
          return <MenuItem value={option.value}>{option.label}</MenuItem>;
        })}
      </BaseSelect>
    </FormControl>
  );
};

export default SelectPicker;
