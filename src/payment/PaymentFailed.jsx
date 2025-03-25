import { XCircle, RefreshCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function PaymentFailed() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-[#F4EAE6] px-4">
      <div className="w-full max-w-md p-6 text-center rounded-2xl shadow-lg bg-white border border-[#FF6961]">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <XCircle className="w-16 h-16 mx-auto text-[#FF6961]" />
        </motion.div>
        <div>
          <h2 className="text-2xl font-bold text-[#3D3B40] mt-4">Payment Failed</h2>
          <p className="text-[#3D3B40] mt-2">Oops! Something went wrong with your payment. Please try again.</p>
          <div className="flex gap-4 justify-center mt-6">
            <button
              className="bg-[#F9D976] hover:bg-[#D8A7B1] text-white rounded-lg px-6 py-2 flex items-center"
              onClick={() => navigate("/cart")}
            >
              <RefreshCcw className="mr-2" size={18} /> Retry Payment
            </button>
            <button
              className="bg-[#A1C3D1] hover:bg-[#A3E4DB] text-white rounded-lg px-6 py-2"
              onClick={() => navigate("/support")}
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
