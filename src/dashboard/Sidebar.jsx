import React, { useEffect, useState } from "react";
import logo from "../assets/logo/logo.png";
import cat from "../assets/images/cat.png";
import { sidebar } from "../constant";
import { ChevronDown, ChevronRight, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { loadSetting, updateSetting } from "../context/SettingContext";

const SideTrunk = ({ item, handelSideButton }) => {
  return (
    <div className="flex">
      {item.display && (
        <div className="flex flex-col w-full">
          <div
            className={`flex gap-3 px-4 py-2 mx-4 cursor-pointer rounded-md border transition duration-200 hover:border-[#A3E4DB] hover:bg-[#A1C3D1] hover:text-white ${
              item.selected
                ? "bor border-[#A3E4DB] bg-[#A1C3D1] text-white"
                : "bor border-[#fff]  bg-[#ffffff] text-stone-800"
            }`}
            onClick={() => handelSideButton(item)}
          >
            <div className="bor">{item.mainItem && item.icon}</div>
            <div className="flex flex-1 justify-between">
              <div>{item.title}</div>
              <div>
                {item.subList.length > 0 && (
                  <div>{item.open ? <ChevronDown /> : <ChevronRight />}</div>
                )}
              </div>
            </div>
          </div>
          <div className="">
            {item.subList.length > 0 && (
              <div
                className={`px-4 transition-all duration-300 overflow-hidden ${
                  !item.open ? "max-h-0 opacity-0" : "max-h-96 opacity-100"
                }`}
              >
                {item.subList.map((subItem) => (
                  <SideTrunk
                    key={item.title + subItem.title}
                    item={subItem}
                    handelSideButton={handelSideButton}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const Sidebar = () => {
  const naviagte = useNavigate();
  const { userName, isAdmin } = loadSetting();
  const { handelLogout, getUserName } = updateSetting();
  const [sidebarBool, setSidebarBool] = useState(true);
  const [sidebarCopy, setSidebarCopy] = useState(sidebar);

  const toggleSidebarBool = () => setSidebarBool((prev) => !prev);

  const handelSideButton = (item) => {
    const newSidebar = item.mainItem
      ? sidebarCopy.map((filterItem) =>
          filterItem === item ? { ...item, open: !item.open } : filterItem
        )
      : sidebarCopy;

    const selectedSidebar = handelSidebarSelection(newSidebar, item);
    setSidebarCopy(
      [...selectedSidebar].sort((a, b) => a.serialId - b.serialId)
    );
    toggleSidebarBool();

    if (item.liveLink) {
      naviagte(item.link);
    }
  };

  const unselectSidebar = (sidebarList) => {
    return sidebarList
      .map((item) => ({
        ...item,
        selected: false,
        subList: item.subList.map((subItem) => ({
          ...subItem,
          selected: false,
        })),
      }))
      .sort((a, b) => a.serialId - b.serialId);
  };

  const handelSidebarSelection = (sidebarList, selectedItem) => {
    const updatedSidebar = unselectSidebar(sidebarList);

    return updatedSidebar.map((item) => {
      if (item.serialId === selectedItem.serialId) {
        return { ...item, selected: true };
      }
      if (!selectedItem.mainItem) {
        return {
          ...item,
          subList: item.subList.map((subItem) =>
            subItem.serialId === selectedItem.serialId
              ? { ...subItem, selected: true }
              : subItem
          ),
        };
      }
      return item;
    });
  };

  useEffect(() => {
    getUserName();
  }, []);

  useEffect(() => {}, [sidebarCopy, sidebarBool, userName]);

  return (
    <div className="flex pt-6 flex-col h-full w-full border-r border-black">
      <div className="flex gap-4 px-6 mb-4 bor">
        <div className="h-12 w-12 bor">
          <img src={logo} />
        </div>
        <h2 className="flex items-center text-2xl bor font-medium font-serif">
          Merch
        </h2>
      </div>
      <div className="flex flex-col gap-2 h-12/15 bor overflow-auto">
        {sidebarCopy &&
          sidebarCopy.length > 0 &&
          sidebarCopy.map((item, index) => (
            <SideTrunk
              key={item.title}
              item={item}
              handelSideButton={handelSideButton}
            />
          ))}
      </div>
      <div className="w-full h-[1px] bg-[#000]"></div>
      <div className="flex flex-col flex-1 gap-3 justify-end px-4 py-4 bor">
        <div
          className="flex gap-3 px-4 py-2 cursor-pointer rounded-md transition duration-200 hover:border-[#A3E4DB] hover:bg-[#A1C3D1] hover:text-white"
          onClick={handelLogout}
        >
          <div>
            <LogOut />
          </div>
          <div>Log Out</div>
        </div>
        <div className="flex gap-3 pl-2 items-center bor">
          <div className=" bor">
            <div className="h-12 w-12 rounded-full bg-[#F4EAE6] border border-stone-600 ">
              <img src={cat} className="w-full" />
            </div>
          </div>
          <div className="flex flex-col bor">
            <div>{userName && userName}</div>
            <div className="text-sm text-stone-500">
              {isAdmin ? "Admin" : "User"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
