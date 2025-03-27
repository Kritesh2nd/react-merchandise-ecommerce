import React from "react";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div className="flex hw-100">
      <div className="h-full w-[340px] bor">
        <Sidebar />
      </div>
      <div className="h-full flex-1 basis-0 borx3">Content</div>
    </div>
  );
};

export default Dashboard;
