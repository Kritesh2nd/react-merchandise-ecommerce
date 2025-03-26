import React, { useState } from "react";
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
  const [sidebarCopy, setSidebarCopy] = useState(sidebar);

  const handelSideButton = (item) => {
    // console.log("item", item);
    if (item.mainItem) {
      // console.log("main item");
      const newSidebar = sidebarCopy.filter((filterItem) => filterItem != item);
      const processedSidebar = [...newSidebar, { ...item, open: !item.open }];
      const sortedSidebar = processedSidebar.sort(
        (a, b) => a.serialId - b.serialId
      );

      handelSidebarSelection(sortedSidebar, item);

      setSidebarCopy(sortedSidebar);
    }
    if (!item.mainItem) {
      const serialId = Math.floor(item.serialId / 10) * 10;

      const mainSublistRemoveSelection = unselectSidebar(sidebarCopy)
      const selectedSidebar = mainSublistRemoveSelection.filter(
        (item) => item.serialId == serialId
      );
      const unselectedSidebar = mainSublistRemoveSelection.filter(
        (item) => item.serialId != serialId
      );

      const remainingSublistSidebar = mainSublistRemoveSelection.filter(
        (item) => item.serialId == (serialId == 20 ? 30 : 20)
      );
      
      const remainingSublistSidebarRemoveSelection = {
        ...remainingSublistSidebar[0],
        subList: unselectSidebar(remainingSublistSidebar[0].subList),
      };

      
      const processedSidebar = handelSidebarSelection(
        selectedSidebar[0].subList,
        item
      );

      const mergeSidebar = [
        ...unselectedSidebar,
        { ...selectedSidebar[0], subList: processedSidebar },
      ];
      console.log(
        "remainingSublistSidebarRemoveSelection",
        remainingSublistSidebarRemoveSelection
      );
      const sortedSidebar = mergeSidebar.sort(
        (a, b) => a.serialId - b.serialId
      );
      setSidebarCopy(sortedSidebar);
    }
  };

  const unselectSidebar = (itemArray) => {
    const unselectItemArray = itemArray.map((mapItem) => {
      mapItem.selected = false;
      return mapItem;
    });
    return unselectItemArray;
  };

  const handelSidebarSelection = (itemArray, selectedItem) => {
    const unselectItemArray = itemArray.map((mapItem) => {
      mapItem.selected = false;
      return mapItem;
    });

    const selectSidebar = unselectItemArray.map((item) => {
      if (item.serialId == selectedItem.serialId) {
        item.selected = true;
      }
      return item;
    });

    const sortedSidebar = selectSidebar.sort((a, b) => a.serialId - b.serialId);
    return sortedSidebar;
  };

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
