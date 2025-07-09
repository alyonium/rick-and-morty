import { TextField } from '@mui/material';
import { type ChangeEvent, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import { useLocation, useSearchParams } from 'react-router-dom';
import { DEFAULT_SEARCH } from 'utils/const.ts';

type FilterProps = {
  onSearch: (value: string) => void;
};

export const Filter = ({ onSearch }: FilterProps) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [input, setInput] = useState<string>(
    location.state?.search || searchParams.get('search') || DEFAULT_SEARCH,
  );

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        onSearch(value);
      }, 400),
    [onSearch],
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setInput(value);
    debouncedSearch(value);
  };

  return (
    <TextField
      fullWidth
      size="small"
      variant="outlined"
      placeholder="Search"
      value={input}
      onChange={handleChange}
    />
  );
};
