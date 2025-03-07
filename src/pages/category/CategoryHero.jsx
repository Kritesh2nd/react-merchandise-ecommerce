import React from "react";
import { Tag, Grid } from "lucide-react";

const CategoryHero = () => {
  return (
    <section className="bg-[#F4EAE6] text-[#3D3B40] py-16 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#FF6961] flex items-center justify-center">
          <Tag className="mr-3" size={36} /> Explore Our Game Merchandise Categories
        </h1>
        <p className="mt-4 text-lg text-[#A1C3D1]">
          Discover high-quality, exclusive merchandise from your favorite game genres, carefully categorized to enhance your gaming lifestyle.
        </p>
        <div className="mt-6 flex justify-center none">
          <button className="bg-[#A3E4DB] text-[#3D3B40] font-semibold py-2 px-6 rounded-xl shadow-lg hover:bg-[#D8A7B1] transition">
            Browse Categories
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoryHero;
