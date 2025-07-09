import { useSearchParams, useLocation } from 'react-router-dom';
import { useMemo, useEffect } from 'react';
import { DEFAULT_SEARCH, DEFAULT_PAGE } from 'utils/const.ts';

export const useCatalogSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const statePage = location.state?.page;
  const stateSearch = location.state?.search;

  useEffect(() => {
    const hasState = statePage !== undefined || stateSearch !== undefined;
    const hasQuery = searchParams.has('page') || searchParams.has('search');

    if (hasState && !hasQuery) {
      setSearchParams({
        page: `${statePage ?? DEFAULT_PAGE}`,
        search: stateSearch ?? DEFAULT_SEARCH,
      });
    }
  }, [statePage, stateSearch, searchParams, setSearchParams]);

  const currentPage = useMemo(() => {
    return (
      statePage ??
      (searchParams.get('page') && +searchParams.get('page')!) ??
      DEFAULT_PAGE
    );
  }, [statePage, searchParams]);

  const currentSearch = useMemo(() => {
    return stateSearch ?? searchParams.get('search') ?? DEFAULT_SEARCH;
  }, [stateSearch, searchParams]);

  const updateParams = ({ page, search }: { page: string; search: string }) => {
    setSearchParams({ page, search });
  };

  return { currentPage, currentSearch, updateParams };
};
