import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex hw-100">
      <div className="h-full w-[340px] bor">
        <Sidebar />
      </div>
      <div className="flex flex-col h-full flex-1 basis-0 bor">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
