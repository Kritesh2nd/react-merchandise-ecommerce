import React from "react";
import Footer from "../general/Footer";
import Navbar from "../general/Navbar";
import UserOrder from "./order/UserOrder";

const Order = () => {
  return (
    <div>
      <section className="h-[90px] bor overflow-hidden">
        <Navbar />
      </section>
      <section>
        <UserOrder/>
      </section>
      <section></section>
      <section>
        <Footer />
      </section>
    </div>
  );
};

export default Order;
