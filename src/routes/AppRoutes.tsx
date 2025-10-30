import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { paths } from "./paths";

const MainLayout = lazy(() => import("../layout/Main/Main"));
const Home = lazy(() => import("../pages/Home/Home"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path={paths.home}
            element={
              <Suspense fallback={<div style={{ padding: 16 }}>Loading…</div>}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path={paths.notFound}
            element={
              <Suspense fallback={<div style={{ padding: 16 }}>Loading…</div>}>
                <NotFound />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
