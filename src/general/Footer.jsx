import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  ShoppingBag,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#3D3B40] text-[#F4EAE6] py-8 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-[#F9D976] flex items-center justify-center md:justify-start">
            <ShoppingBag className="mr-2" size={24} /> GameMerch
          </h2>
          <p className="mt-2 text-sm text-[#A1C3D1]">
            Your one-stop shop for exclusive gaming merchandise!
          </p>
        </div>

        {/* Links Section */}
        <div>
          <h3 className="text-lg font-semibold text-[#D8A7B1]">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <a href="/" className="hover:text-[#F9D976] transition">
                Home
              </a>
            </li>
            <li>
              <a href="/shop" className="hover:text-[#F9D976] transition">
                Shop
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-[#F9D976] transition">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#F9D976] transition">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#F9D976] transition">
                FAQs
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-semibold text-[#D8A7B1]">Contact Us</h3>
          <ul className="mt-2 space-y-2">
            <li className="flex items-center justify-center md:justify-start">
              <Mail size={18} className="mr-2 text-[#F9D976]" />{" "}
              support@gamemerch.com
            </li>
            <li className="flex items-center justify-center md:justify-start">
              <Phone size={18} className="mr-2 text-[#F9D976]" /> +1 (234)
              567-890
            </li>
            <li className="flex items-center justify-center md:justify-start">
              <MapPin size={18} className="mr-2 text-[#F9D976]" /> 123 Gaming
              St, Lalitpur, Nepal
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div>
          <h3 className="text-lg font-semibold text-[#D8A7B1]">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4 mt-2">
            <a href="#" className="hover:text-[#F9D976] transition">
              <Facebook size={24} />
            </a>
            <a href="#" className="hover:text-[#F9D976] transition">
              <Twitter size={24} />
            </a>
            <a href="#" className="hover:text-[#F9D976] transition">
              <Instagram size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center text-sm text-[#A1C3D1] mt-8 border-t border-[#A1C3D1] pt-4">
        &copy; {new Date().getFullYear()} GameMerch. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
