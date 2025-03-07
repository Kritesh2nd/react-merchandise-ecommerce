import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import notFound from "../assets/images/not_found.png"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fff] text-[#3D3B40] px-6">
      <div className="text-center">
        <AlertTriangle size={50} className="text-[#FF6961] mx-auto mb-4" />
        <img
          src={notFound}
          alt="Not Found"
          className="w-60 h-auto mx-auto mb-4 rounded-lg "
        />
        <h1 className="text-4xl font-bold">Oops! Page Not Found</h1>
        <p className="text-lg text-[#3D3B40] mt-2">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block bg-[#A1C3D1] text-[#3D3B40] px-6 py-3 rounded-lg shadow-md hover:bg-[#A3E4DB] transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
