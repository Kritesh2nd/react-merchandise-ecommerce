import { useState, useEffect } from "react";
import { LogOut } from "lucide-react";
import { loadSetting, updateSetting } from "../context/SettingContext";

const Logout = () => {
  const { logoutVisible } = loadSetting();
  const { toggleLogoutVisible, handelLogout } = updateSetting();

  if (!logoutVisible) return null;
  //window.location.reload();
  return (
    <div className="fixed inset-0 flex items-center justify-center bgopa50">
      <div className="p-6 py-12 rounded-2xl shadow-lg bg-white flex flex-col items-center gap-4 w-80 sm:w-96 text-center">
        <h2 className="text-xl font-semibold text-[#3D3B40]">
          Are you sure you want to logout?
        </h2>
        <div className="flex gap-4">
          <button
            className="text-white font-semibold px-6 py-2 rounded-lg bg-[#FF6961] hover:bg-[#D4554E] transition-colors duration-200 cursor-pointer"
            onClick={handelLogout}
          >
            Logout
          </button>
          <button
            className="text-[#3D3B40] font-semibold px-6 py-2 rounded-lg bg-[#A1C3D1] hover:bg-[#A3E4DB] transition-colors duration-200 cursor-pointer"
            onClick={toggleLogoutVisible}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
