import React, { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import {
  loadHandelProduct,
  updateHandelProduct,
} from "../../context/HandelProductContext";

const OrderPendingList = () => {
  const { pendingOrder } = loadHandelProduct();
  const { getPendingOrder, handelPendingOrder } = updateHandelProduct();
  const [dataList, setDataList] = useState(pendingOrder ? pendingOrder : []);

  // Group orders by orderId
  const groupedOrders = dataList.reduce((acc, order) => {
    if (!acc[order.orderId]) {
      acc[order.orderId] = { items: [], grandTotal: 0, date: order.date };
    }
    acc[order.orderId].items.push(order);
    acc[order.orderId].grandTotal += order.price * order.quantity;
    return acc;
  }, {});

  const completeOrder = (id) => {
    handelPendingOrder(id);
  };

  useEffect(() => {
    getPendingOrder();
  }, []);

  useEffect(() => {
    setDataList(pendingOrder ? pendingOrder : []);
  }, [pendingOrder]);

  return (
    <div className="mt-10 mb-20 flex flex-col gap-4 overflow-x-auto whitespace-nowrap px-6  bor">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center bor">
        <ShoppingCart className="mr-2" /> Pending Order
      </h2>
      {dataList.length == 0 && <div>No Pending Order</div>}
      <div className="space-y-6">
        {Object.entries(groupedOrders).map(
          ([orderId, { items, grandTotal, date }]) => (
            <div key={orderId} className="bg-[#F4EAE6] p-4 rounded-md">
              <div>
                <div className="mb-2 text-gray-700">
                  <p className="text-lg font-bold">Order ID: {orderId}</p>
                  <p className="text-sm">
                    Date: {new Date(date).toLocaleString()}
                  </p>
                </div>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.productId}
                      className="flex justify-between bg-[#A1C3D1] p-2 rounded-md"
                    >
                      <span className="font-normal">
                        {item.title} (x{item.quantity})
                      </span>
                      <span>NRP {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 font-medium text-[#3D3B40] flex gap-4 items-center justify-between">
                  <div className="flex gap-4">
                    <span>Grand Total:</span>
                    <span>NRP {grandTotal.toFixed(2)}</span>
                  </div>
                  <div className="bor">
                    <div
                      className="px-10 py-[6px] font-normal rounded-md border transition duration-300 border-[#3D3B40] hover:bg-[#A1C3D1] hover:text-white cursor-pointer  bor"
                      onClick={() => completeOrder(orderId)}
                    >
                      Complete
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default OrderPendingList;
