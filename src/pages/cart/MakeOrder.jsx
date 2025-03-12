import React, { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import {
  loadHandelProduct,
  updateHandelProduct,
} from "../../context/HandelProductContext";

const MakeOrder = () => {
  // Calculate total price and discount
  const { userCart } = loadHandelProduct();r
  const { getUserCart, makePayment } = updateHandelProduct();
  const totalAmount = userCart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalDiscount = userCart.reduce(
    (sum, item) => sum + (item.discount || 0) * item.quantity,
    0
  );
  const finalAmount = (totalAmount - totalDiscount).toFixed(2);

  const onOrder = () => {
    const userOrder = userCart;
    // console.log("userCart", userCart);
    makePayment(userCart);
  };

  useEffect(() => {
    getUserCart();
  }, []);

  return (
    <div className="flex justify-center p-6 bg-[#F4EAE6] text-[#3D3B40] w-full pb-50 ">
      <div className="w-[500px] bor">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Order Summary
        </h2>
        <div className="mt-4 p-5 bg-[#A1C3D1] rounded-lg shadow-sm border border-[#D8A7B1]">
          <p className="text-lg font-medium">
            Total:{" "}
            <span className="font-bold">NRP {totalAmount.toFixed(2)}</span>
          </p>
          <p className="text-lg font-medium">
            Discount:{" "}
            <span className="font-bold">- NRP {totalDiscount.toFixed(2)}</span>
          </p>
          <h3 className="text-xl font-bold mt-3">
            Final Amount: NRP {finalAmount}
          </h3>
        </div>
        <button
          onClick={onOrder}
          disabled={userCart.length === 0}
          className="mt-5 w-full bg-[#D8A7B1] text-[#3D3B40] font-bold py-2 rounded-lg flex items-center justify-center gap-2 shadow-md transition  cursor-pointer"
        >
          <ShoppingCart size={20} /> Make Payment
        </button>
      </div>
    </div>
  );
};

export default MakeOrder;
