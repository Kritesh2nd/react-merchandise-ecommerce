import React, { useEffect, useState } from "react";
import Footer from "../general/Footer";
import Navbar from "../general/Navbar";
import CategroyHero from "./category/CategoryHero";
import CategoryList from "./category/CategoryList";
import { useParams } from "react-router-dom";
import ProductList from "./home/ProductList";
import { loadProduct, updateProduct } from "../context/ProductContext";

const Category = () => {
  const { code } = useParams();
  const { categoryProducts } = loadProduct();
  const { getCategoryProducts } = updateProduct();
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    getCategoryProducts(code);
  }, [code]);
  useEffect(() => {
    setDataList(categoryProducts);
  }, [categoryProducts]);

  return (
    <>
      <section className="h-[90px] bor overflow-hidden">
        <Navbar />
      </section>
      <section>
        <CategroyHero />
      </section>
      <section>
        <CategoryList />
      </section>
      <section>
        <ProductList dataList={dataList} title="Categorised Products" />
      </section>
      <section>
        <Footer />
      </section>
    </>
  );
};

export default Category;
