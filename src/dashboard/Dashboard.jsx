import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { loadSetting } from "../context/SettingContext";

const Dashboard = () => {
  const { isAdmin } = loadSetting();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
  }, []);

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
