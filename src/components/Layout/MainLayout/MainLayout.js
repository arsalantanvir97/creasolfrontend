import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import MainHeader from "./MainHeader";
import Sidebar from "./Sidebar";
const MainLayout = () => {
  useEffect(() => {
    console.log("Main effect called");
  }, []);
  return (
    <>
      <MainHeader />
      <div className="app-content content">
        <Sidebar />
        <div className="content-wrapper">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
