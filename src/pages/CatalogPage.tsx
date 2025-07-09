import PageWrapper from 'components/PageWrapper/PageWrapper.tsx';
import CatalogTable from 'modules/CatalogTable/CatalogTable.tsx';

const CatalogPage = () => {
  return (
    <PageWrapper title="characters catalog">
      <CatalogTable />
    </PageWrapper>
  );
};

export default CatalogPage;
