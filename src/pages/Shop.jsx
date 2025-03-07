import React, { useEffect, useState } from "react";
import Navbar from "../general/Navbar";
import Footer from "../general/Footer";
import { loadProduct, updateProduct } from "../context/ProductContext";
import ProductList from "./home/ProductList";
import ShopHero from "./shop/ShopHero";

const Shop = () => {
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
    <div>
      <section className="h-[90px] bor overflow-hidden">
        <Navbar />
      </section>
      <section>
        <ShopHero/>
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

export default Shop;
