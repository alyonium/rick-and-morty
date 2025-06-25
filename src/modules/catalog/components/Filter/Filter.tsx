import { TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import debounce from "lodash/debounce";

type FilterProps = {
  onSearch: (value: string) => void;
};

export const Filter = ({ onSearch }: FilterProps) => {
  const [input, setInput] = useState("");

  const debouncedLog = useMemo(
    () =>
      debounce((value: string) => {
        onSearch(value);
      }, 400),
    [],
  );

  useEffect(() => {
    debouncedLog(input);

    return () => {
      debouncedLog.cancel();
    };
  }, [input]);

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search"
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
  );
};
