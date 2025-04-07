import { ShoppingBag } from "lucide-react";
import heroImg from "../../assets/images/hero_img.png";
export default function Hero() {
  return (
    <div className="relative w-full min-h-screen bg-[#F4EAE6] flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 py-10">
      {/* Left Content */}
      <div className="max-w-lg text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#3D3B40] leading-tight">
          Level Up Your <span className="text-[#FF6961]">Style</span> with{" "}
          <span className="text-[#A1C3D1]">Exclusive Merch</span>
        </h1>
        <p className="mt-4 text-lg text-[#3D3B40]">
          Discover premium gaming merchandise that brings your favorite games to
          life. Shop now and upgrade your collection!
        </p>
        <div className="flex">
          <a
            href="#feature-product"
            className="mt-6 flex items-center gap-2 bg-[#A1C3D1] text-[#3D3B40] px-6 py-3 rounded-lg shadow-md hover:bg-[#7D9EAE] cursor-pointer transition duration-300"
          >
            <ShoppingBag size={22} />
            Shop Now
          </a>
        </div>
      </div>

      {/* Right Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src={heroImg}
          alt="Gaming Merch"
          className="w-full max-w-md md:max-w-lg rounded-lg"
        />
      </div>
    </div>
  );
}

/*

id
code
type
title
description
game
genre
imageUrl
featured(boolean)
rating
price
quantity
discount
soldAmount

*/
