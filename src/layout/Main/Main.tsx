import React from "react";
import { Outlet } from "react-router-dom";
import AppToolbar from "../Toolbar/AppToolbar";
import Footer from "../Footer/Footer";

const MainLayout: React.FC = () => {

  return (
    <div style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      <AppToolbar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
