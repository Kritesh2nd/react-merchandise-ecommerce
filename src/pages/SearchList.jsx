import React, { useEffect } from "react";
import SearchProductList from "./search/SearchProductList";
import Navbar from "../general/Navbar";
import Footer from "../general/Footer";
import { useParams } from "react-router-dom";
import {
  loadHandelProduct,
  updateHandelProduct,
} from "../context/HandelProductContext";

const SearchList = () => {
  const { keyword } = useParams();
  const { searchResult } = loadHandelProduct();
  const { getSearchProducts } = updateHandelProduct();

  useEffect(() => {
    getSearchProducts(keyword);
  }, [keyword]);

  return (
    <div>
      <section className="h-[90px] bor overflow-hidden">
        <Navbar />
      </section>
      <section className="bg-[#F4EAE6] bor pt-20 pb-10 px-6 sm:px-20 md:px-52 ">
      <h2 className="text-2xl">Search Keyword: {keyword}</h2>
      </section>
      <section>
        <SearchProductList dataList={searchResult} />
      </section>
      <section>
        <Footer />
      </section>
    </div>
  );
};

export default SearchList;
