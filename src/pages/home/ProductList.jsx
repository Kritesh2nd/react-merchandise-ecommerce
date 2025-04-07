import React from "react";
import { ShoppingCart, Star } from "lucide-react";
import { loadSetting, updateSetting } from "../../context/SettingContext";
import { updateHandelProduct } from "../../context/HandelProductContext";

const ProductList = ({ dataList, title }) => {
  const { loggedIn } = loadSetting();
  const { toggleDisplayAuthForm } = updateSetting();
  const { addToCart } = updateHandelProduct();
  return (
    <div
      id={`${title == "Featured Products" ? "feature-product" : ""}`}
      className="p-6 bg-[#F4EAE6] min-h-screen sm:px-20 lg:px-40"
    >
      <h2 className="text-3xl font-bold text-[#3D3B40] mb-6 text-center bor">
        {title ? title : "Product List"}
      </h2>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {dataList &&
          dataList.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center hover:shadow-2xl transition"
            >
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-[#3D3B40]">
                {product.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {product.description}
              </p>
              <p className="text-md text-[#D8A7B1] font-bold">
                {product.game} - {product.genre}
              </p>
              <div className="flex items-center mt-2">
                <Star className="text-[#F9D976]" size={18} />
                <span className="text-[#3D3B40] ml-1 font-medium">
                  {product.rating}
                </span>
              </div>
              <p className="text-lg font-semibold text-[#FF6961] mt-2">
                NRP {product.price}{" "}
                <span className="text-sm text-gray-500 line-through">
                  {product.discount > 0 && (
                    <>
                      NRP{" "}
                      {(product.price / (1 - product.discount / 100)).toFixed(
                        2
                      )}
                    </>
                  )}
                </span>
              </p>
              {!loggedIn && (
                <button
                  className="mt-4 bg-[#A3E4DB] hover:bg-[#A1C3D1] text-white font-bold py-2 px-4 rounded-lg flex items-center cursor-pointer"
                  onClick={toggleDisplayAuthForm}
                >
                  <ShoppingCart size={18} className="mr-2" /> Add to Cart
                </button>
              )}
              {loggedIn && (
                <button
                  className="mt-4 bg-[#A3E4DB] hover:bg-[#A1C3D1] text-white font-bold py-2 px-4 rounded-lg flex items-center cursor-pointer"
                  onClick={() => {
                    addToCart(product.id);
                  }}
                >
                  <ShoppingCart size={18} className="mr-2" /> Add to Cart
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductList;
