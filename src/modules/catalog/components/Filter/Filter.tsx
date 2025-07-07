import { TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import debounce from "lodash/debounce";

type FilterProps = {
  onSearch: (value: string) => void;
};

export const Filter = ({ onSearch }: FilterProps) => {
  const [input, setInput] = useState<string>("");
  const [isValueChanged, setIsValueChanged] = useState<boolean>(false);

  const debouncedLog = useMemo(
    () =>
      debounce((value: string) => {
        onSearch(value);
      }, 400),
    [],
  );

  useEffect(() => {
    if (!isValueChanged) {
      return;
    }

    debouncedLog(input);

    return () => {
      debouncedLog.cancel();
    };
  }, [input]);

  return (
    <TextField
      fullWidth
      size="small"
      variant="outlined"
      placeholder="Search"
      value={input}
      onChange={(e) => {
        setIsValueChanged(true);
        setInput(e.target.value);
      }}
    />
  );
};
