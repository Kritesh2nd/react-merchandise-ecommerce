import React, { useEffect, useState } from "react";
import Navbar from "../general/Navbar";
import Hero from "./home/Hero";
import ProductList from "./home/ProductList";
import Footer from "../general/Footer";
import { loadProduct, updateProduct } from "../context/ProductContext";

const Home = () => {
  const { featuredProducts, discountedProducts } = loadProduct();
  const { getFeaturedProducts, getDiscountedProducts } = updateProduct();
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    getFeaturedProducts();
    getDiscountedProducts();
  }, []);
  useEffect(() => {
    setDataList(featuredProducts);
  }, [featuredProducts]);
  return (
    <div className="bor">
      <section className="h-[90px] bor overflow-hidden">
        <Navbar />
      </section>
      <section>
        <Hero />
      </section>
      <section>
        <ProductList dataList={dataList} title="Featured Products" />
      </section>
      <section>
        <ProductList
          dataList={discountedProducts}
          title="Discounted Products"
        />
      </section>
      <section>
        <Footer />
      </section>
    </div>
  );
};

export default Home;
