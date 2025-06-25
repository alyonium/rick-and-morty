import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTE } from "./const.ts";
import CatalogPage from "../modules/catalog/CatalogPage.tsx";

const AppRouter = () => {
  return (
    <Routes>
      <Route path={ROUTE.CATALOG} element={<CatalogPage />} />
      <Route path="*" element={<Navigate to={ROUTE.CATALOG} replace />} />
    </Routes>
  );
};

export default AppRouter;
