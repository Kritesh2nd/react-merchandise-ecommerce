import React, { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import {
  loadHandelProduct,
  updateHandelProduct,
} from "../../context/HandelProductContext";

const UserOrder = () => {
  const { userOrder } = loadHandelProduct();
  const { getUserOrder } = updateHandelProduct();
  const [dataList, setDataList] = useState([]);

  // Helper function to capatalize first letter
  const capitalizeFirst = (word) => {
    if (!word || typeof word !== "string") return "";
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  // Group orders by orderId
  const groupedOrders = dataList.reduce((acc, order) => {
    if (!acc[order.orderId]) {
      acc[order.orderId] = {
        items: [],
        grandTotal: 0,
        date: order.date,
        status: order.status,
      };
    }
    acc[order.orderId].items.push(order);
    acc[order.orderId].grandTotal += order.price * order.quantity;
    return acc;
  }, {});

  useEffect(() => {
    getUserOrder();
  }, []);

  useEffect(() => {
    setDataList(userOrder ? userOrder : []);
  }, [userOrder]);

  return (
    <div className="mt-10 mb-20 flex flex-col min-h-[500px] gap-4 overflow-x-auto whitespace-nowrap px-6 sm:px-6 md:px-20 lg:px-64 bor">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
        <ShoppingCart className="mr-2" /> Order History
      </h2>
      <div className="space-y-6">
        {dataList && dataList.length == 0 && (
          <div className="text-stone-700">No order history</div>
        )}
        {Object.entries(groupedOrders).map(
          ([orderId, { items, grandTotal, date, status }]) => (
            <div
              key={orderId}
              className="bg-[#F4EAE6] p-4 rounded-lg shadow-md"
            >
              <div>
                <div className="mb-2 text-gray-700">
                  <p className="text-lg font-bold">Order ID: {orderId}</p>
                  <p className="text-sm">
                    Date: {new Date(date).toLocaleString()}
                  </p>
                  <div>
                    Status:{" "}
                    <span
                      className={` text-sm px-3 py-[2px] rounded-md ${
                        status == "pending"
                          ? "bg-gray-400 text-stone-100"
                          : "bg-green-500"
                      } `}
                    >
                      {capitalizeFirst(status)}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.productId}
                      className="flex justify-between bg-[#A1C3D1] p-2 rounded-lg"
                    >
                      <span className="font-medium">
                        {item.title} (x{item.quantity})
                      </span>
                      <span>NRP {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 font-bold text-xl text-[#3D3B40] flex justify-between">
                  <span>Grand Total:</span>
                  <span>NRP {grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default UserOrder;
