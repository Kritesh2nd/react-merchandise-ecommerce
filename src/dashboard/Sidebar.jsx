import React, { useEffect, useState } from "react";
import logo from "../assets/logo/logo.png";
import { sidebar } from "../constant";
import { ChevronDown, ChevronRight } from "lucide-react";

const SideTrunk = ({ item, handelSideButton }) => {
  return (
    <div className="flex flex-col">
      <div
        className={`px-4 py-2 mx-4 cursor-pointer rounded-md ${
          item.selected ? "borr" : "borx3"
        }`}
        onClick={() => handelSideButton(item)}
      >
        <div className="flex justify-between">
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
  );
};

const Sidebar = () => {
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

  useEffect(() => {}, [sidebarCopy, sidebarBool]);

  return (
    <div className="flex pt-6 flex-col h-full w-full bor">
      <div className="flex gap-4 px-6 mb-4 bor">
        <div className="h-12 w-12 bor">
          <img src={logo} />
        </div>
        <h2 className="flex items-center text-2xl bor font-medium font-serif">
          Merch
        </h2>
      </div>
      <div className="flex flex-col gap-2 h-12/14 borx overflow-auto">
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
      <div className="borx">cat</div>
    </div>
  );
};

export default Sidebar;
