import { CheckCircle, ShoppingCart, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
// import { updateHandelProduct } from "../context/HandelProductContext";
// import { useEffect } from "react";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  // const { removeAllUserCartProduct } = updateHandelProduct();

  // useEffect(() => {
  //   console.log("removeAllUserCartProduct");
  //   removeAllUserCartProduct();
  // }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-[#F4EAE6] px-4">
      <div className="w-full max-w-md p-6 text-center rounded-2xl shadow-lg bg-white border border-[#D8A7B1] bor">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CheckCircle className="w-16 h-16 mx-auto text-[#A3E4DB]" />
        </motion.div>
        <div>
          <h2 className="text-2xl font-bold text-[#3D3B40] mt-4">
            Payment Successful!
          </h2>
          <p className="text-[#3D3B40] mt-2">
            Thank you for your purchase. Your order will be processed soon.
          </p>
          <div className="flex flex-col gap-4 justify-center mt-6 bor">
            <div className="flex justify-between gap-4">
              <button
                className="flex-1 bg-[#A1C3D1] hover:bg-[#A3E4DB] text-white rounded-lg px-6 py-2 flex items-center cursor-pointer"
                onClick={() => navigate("/")}
              >
                <Home className="mr-2" size={18} /> Go to Home
              </button>
              <button
                className="flex-1 bg-[#F9D976] hover:bg-[#A1C3D1] text-white rounded-lg px-6 py-2 cursor-pointer"
                onClick={() => navigate("/orders")}
              >
                View Orders
              </button>
            </div>
            <div className="flex">
              <button
                className=" bg-[#FF6961] hover:bg-[#D8A7B1] text-white rounded-lg px-6 py-2 flex items-center cursor-pointer"
                onClick={() => navigate("/shop")}
              >
                <ShoppingCart className="mr-2" size={18} /> Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
