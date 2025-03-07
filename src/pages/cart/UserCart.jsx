import react, { useEffect, useState } from "react";
import { Trash2, Minus, Plus } from "lucide-react";
import {
  loadHandelProduct,
  updateHandelProduct,
} from "../../context/HandelProductContext";

const UserCart = () => {
  const { userCart } = loadHandelProduct();
  const { getUserCart, updateCartProductQuantity, removeCartProduct } =
    updateHandelProduct();

  const updateQuantity = (id, increade) => {
    updateCartProductQuantity(increade, id);
  };

  const removeItem = (id) => {
    removeCartProduct(id);
  };

  useEffect(() => {
    getUserCart();
  }, []);

  useEffect(() => {
    getUserCart();
  }, [userCart]);

  return (
    <div className="p-4 bg-[#F4EAE6] py-6">
      <h2 className="text-2xl font-bold text-[#3D3B40] mb-4  px-6 sm:px-20 md:px-52 lg:px-72">
        Shopping Cart
      </h2>
      <div className="flex flex-col gap-4 overflow-x-auto whitespace-nowrap px-6 sm:px-20 md:px-52 lg:px-72">
        {userCart && userCart.length == 0 && <div>No Products in Cart</div>}
        {userCart &&
          userCart.map((product) => (
            <div
              key={product.id}
              className="flex bg-white p-4 rounded-2xl shadow-md gap-4 items-center min-w-[350px]"
            >
              <div className="w-50">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>
              <div className="flex flex-col bor w-full">
                <h3 className="text-lg font-semibold text-[#3D3B40]">
                  {product.title}
                </h3>
                <p className="text-sm text-[#D8A7B1]">{product.description}</p>
                <p className="text-sm font-medium text-[#A1C3D1]">
                  {product.game} - {product.genre}
                </p>
                <div className="flex w-full justify-between items-center mt-2 bor ">
                  <span className="text-lg font-bold text-[#FF6961]">
                    NRP {product.price.toFixed(2)}
                  </span>
                  <div className="flex gap-5 bor">
                    <div className="flex items-center gap-2 bor">
                      <button
                        onClick={() => updateQuantity(product.id, false)}
                        className="p-2 bg-[#A3E4DB] rounded-full hover:bg-[#76c7b6] cursor-pointer"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="text-[#3D3B40] font-medium w-5 bor text-center">
                        {product.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, true)}
                        className="p-2 bg-[#A3E4DB] rounded-full hover:bg-[#76c7b6] cursor-pointer"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(product.id)}
                      className="p-2 bg-[#FF6961] rounded-full hover:bg-[#e35d57] cursor-pointer"
                    >
                      <Trash2 size={16} color="white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserCart;
