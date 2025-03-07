import React from "react";
import Footer from "../general/Footer";
import Navbar from "../general/Navbar";
import UserCart from "./cart/UserCart";
import MakeOrder from "./cart/MakeOrder";

const Cart = () => {
  return (
    <div>
      <section className="h-[90px] bor overflow-hidden">
        <Navbar />
      </section>
      <section>
        <UserCart />
      </section>
      <section>
        <MakeOrder />
      </section>
      <section>
        <Footer />
      </section>
    </div>
  );
};

export default Cart;
