import React from "react";
import { ShoppingBag, ChevronRight } from "lucide-react";

const ShopHero = () => {
  return (
    <div className="bg-[#F4EAE6] p-6 flex flex-col items-center">
      {/* Hero Section */}
      <div className="text-center max-w-3xl">
        <h1 className="text-4xl font-bold text-[#3D3B40]">Game Merchandise Store</h1>
        <p className="text-lg text-[#D8A7B1] mt-2">
          Discover exclusive, high-quality gaming gear & collectibles.
        </p>
      </div>

      {/* Explore Button */}
      <button className="mt-6 flex items-center gap-2 bg-[#A3E4DB] text-[#3D3B40] px-6 py-3 rounded-lg font-semibold hover:bg-[#A1C3D1] cursor-pointer transition-all">
        <ShoppingBag className="w-5 h-5" /> Explore Products <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ShopHero;
