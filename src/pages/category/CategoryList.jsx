import React from "react";

import { ShoppingCart, Gamepad2 } from "lucide-react";
import { categoryList } from "../../constant/index";
import { Link } from "react-router-dom";

const CategoryList = () => {
  return (
    <div className="p-4 bg-[#F4EAE6] px-[100px] bor">
      <h2 className="text-2xl font-bold text-[#3D3B40] mb-6">Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {categoryList.map((category) => (
          <Link
            key={category.code}
            to={"/category/" + category.code}
            className="rounded-2xl overflow-hidden shadow-md bg-[#A1C3D1] hover:scale-105 transition-transform cursor-pointer"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 flex justify-between items-center">
              <span className="text-lg font-semibold text-[#3D3B40]">
                {category.name}
              </span>
              <button className="bg-[#FF6961] text-white hover:bg-[#D55A52] px-4 py-2 rounded-md flex items-center cursor-pointer">
                <Gamepad2 className="mr-2" /> View
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
