import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTE } from './const.ts';
import CatalogPage from 'pages/CatalogPage.tsx';
import CardPage from 'pages/CardPage.tsx';

const AppRouter = () => {
  return (
    <Routes>
      <Route path={ROUTE.CATALOG} element={<CatalogPage />} />
      <Route path={`${ROUTE.CARD}/:cardMode/:cardId`} element={<CardPage />} />
      <Route path="*" element={<Navigate to={ROUTE.CATALOG} replace />} />
    </Routes>
  );
};

export default AppRouter;
