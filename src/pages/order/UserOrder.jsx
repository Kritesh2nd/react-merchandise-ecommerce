import React, { useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import {
  loadHandelProduct,
  updateHandelProduct,
} from "../../context/HandelProductContext";

const UserOrder = () => {
  const { userOrder } = loadHandelProduct();
  const { getUserOrder } = updateHandelProduct();

  // Group orders by orderId
  const groupedOrders = userOrder.reduce((acc, order) => {
    if (!acc[order.orderId]) {
      acc[order.orderId] = { items: [], grandTotal: 0, date: order.date };
    }
    acc[order.orderId].items.push(order);
    acc[order.orderId].grandTotal += order.price * order.quantity;
    return acc;
  }, {});

    useEffect(() => {
    getUserOrder();
  }, []);

  useEffect(() => {
    console.log("userOrder", userOrder);
  }, [userOrder]);

  return (
    <div className="mt-10 mb-20 flex flex-col gap-4 overflow-x-auto whitespace-nowrap px-6 sm:px-6 md:px-20 lg:px-64">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
        <ShoppingCart className="mr-2" /> Order History
      </h2>
      <div className="space-y-6">
        {Object.entries(groupedOrders).map(([orderId, { items, grandTotal, date }]) => (
          <div key={orderId} className="bg-[#F4EAE6] p-4 rounded-lg shadow-md">
            <div>
              <div className="mb-2 text-gray-700">
                <p className="text-lg font-bold">Order ID: {orderId}</p>
                <p className="text-sm">Date: {new Date(date).toLocaleString()}</p>
              </div>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.productId} className="flex justify-between bg-[#A1C3D1] p-2 rounded-lg">
                    <span className="font-medium">{item.title} (x{item.quantity})</span>
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
        ))}
      </div>
    </div>
  );
};

export default UserOrder;


/*

write react code make user order history component for game merchandise ecommerce website 
it displays the array of data
as all user orders comes in one array, diffrent order are divided by the value orderId.
display all orders with same orderId in one group and also display grandtotal by calulating total for that same orderId
make it responsive and light themed 
use these color pallet #A1C3D1  #F4EAE6  #D8A7B1  #3D3B40  #A3E4DB  #F9D976  #FF6961 
use lucid react for icon
enhance its user interface
array of order will come from this code const { userOrder } = loadHandelProduct();

here's the order data array
[
  {
    id: 'c976f9a6-b7fd-4523-b323-02ba6cb4ad86',
    userId: 'd7aa0465-c92b-492e-bc84-90ca1167b693',
    productId: 1,
    title: 'Cyber Warrior Pack',
    price: 49.99,
    quantity: 2,
    orderId: 'c976f9a6-b7fd-4523-b323-02ba6cb4ad86',
    date: '2025-03-25T08:33:30.259Z'
  },
  {
    id: 'c976f9a6-b7fd-4523-b323-02ba6cb4ad86',
    userId: 'd7aa0465-c92b-492e-bc84-90ca1167b693',
    productId: 3,
    title: 'Fantasy Quest Bag',
    price: 34.99,
    quantity: 4,
    orderId: 'c976f9a6-b7fd-4523-b323-02ba6cb4ad86',
    date: '2025-03-25T08:33:30.259Z'
  },
  {
    id: 'e4dba9bc-4739-4301-b0bb-d7d388db6c90',
    userId: 'd7aa0465-c92b-492e-bc84-90ca1167b693',
    productId: 1,
    title: 'Cyber Warrior Pack',
    price: 49.99,
    quantity: 3,
    orderId: 'e4dba9bc-4739-4301-b0bb-d7d388db6c90',
    date: '2025-03-25T08:36:50.048Z'
  },
  {
    id: 'e4dba9bc-4739-4301-b0bb-d7d388db6c90',
    userId: 'd7aa0465-c92b-492e-bc84-90ca1167b693',
    productId: 36,
    title: 'Warzone Tactics Poster',
    price: 14.99,
    quantity: 6,
    orderId: 'e4dba9bc-4739-4301-b0bb-d7d388db6c90',
    date: '2025-03-25T08:36:50.048Z'
  }
]

*/
