import { useEffect, useState } from "react";
import { List, Menu, Search, ShoppingCart, User } from "lucide-react";
import { LogOut } from "lucide-react";
import logo from "../assets/logo/logo.png";
import AuthForm from "../container/AuthForm";
import { loadSetting, updateSetting } from "../context/SettingContext";
import { Link, useNavigate } from "react-router-dom";
import Logout from "./Logout";
import {
  loadHandelProduct,
  updateHandelProduct,
} from "../context/HandelProductContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { loggedIn } = loadSetting();
  const { toggleDisplayAuthForm, toggleLogoutVisible } = updateSetting();
  const { cartCount } = loadHandelProduct();
  const { getUserCart, getCartCount } = updateHandelProduct();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    getCartCount();
    getUserCart();
  }, [loggedIn]);

  const handelSearch = (e) => {
    if (e.target.value == "") {
    }
    navigate("/search/" + e.target.value);
  };

  return (
    <nav className="w-full bg-[#F4EAE6] shadow-md p-4 top-0 z-50 fixed">
      <div className="container mx-auto flex justify-between items-center bor">
        {/* Logo */}
        <div className="h-[60px] text-2xl font-bold text-[#3D3B40]">
          <img src={logo} className="h-full" />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-[#3D3B40] font-medium bor">
          <li className="hover:text-[#D8A7B1] transition duration-300 cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-[#D8A7B1] transition duration-300 cursor-pointer">
            <Link to="/shop">Shop</Link>
          </li>
          <li className="hover:text-[#D8A7B1] transition duration-300 cursor-pointer">
            <Link to="/category">Categories</Link>
          </li>
          <li className="hover:text-[#D8A7B1] transition duration-300 cursor-pointer">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        {/* Search & Cart/Profile */}
        <div className="flex items-center space-x-4 bor">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="bg-[#A1C3D1] text-white rounded-full px-4 py-2 focus:outline-none placeholder-white"
              onInput={handelSearch}
            />
            <Search className="absolute right-3 top-2 text-white" size={18} />
          </div>
          {loggedIn && (
            <>
              <div
                className="relative text-[#3D3B40] hover:text-[#FF6961] bor"
                onClick={() => {
                  navigate("/cart");
                }}
              >
                <ShoppingCart
                  className=" cursor-pointer text-inherit transition duration-300 bor"
                  size={24}
                />
                <span className="flexmid absolute -bottom-2 -right-2 pb-[1px] pl-[1px] bg-[#F4EAE6] text-inherit duration-300 border border-stone-500 rounded-full h-4 w-4">
                  {cartCount}
                </span>
              </div>
              <div
                className="relative text-[#3D3B40] hover:text-[#FF6961] bor"
                onClick={() => {
                  navigate("/order");
                }}
              >
                <List
                  className=" cursor-pointer text-inherit transition duration-300 bor"
                  size={24}
                />
              </div>
              <User
                className="text-[#3D3B40] cursor-pointer hover:text-[#FF6961] transition duration-300 hidden md:flex"
                onClick={toggleDisplayAuthForm}
                size={24}
              />
              <LogOut
                className="text-[#3D3B40] cursor-pointer hover:text-[#FF6961] transition duration-300 hidden md:flex"
                onClick={toggleLogoutVisible}
                size={24}
              />
            </>
          )}
          {!loggedIn && (
            <User
              className="text-[#3D3B40] cursor-pointer hover:text-[#FF6961] transition duration-300 hidden md:flex"
              onClick={toggleDisplayAuthForm}
              size={24}
            />
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-md bg-transparent hover:bg-[#D8A7B1] transition duration-300 bor"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="md:hidden flex flex-col  text-[#3D3B40] p-4 mt-2 space-y-2 ">
          <li className="hover:text-[#D8A7B1] transition duration-300 cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-[#D8A7B1] transition duration-300 cursor-pointer">
            <Link to="shop">Shop</Link>
          </li>
          <li className="hover:text-[#D8A7B1] transition duration-300 cursor-pointer">
            <Link to="categories">Categories</Link>
          </li>
          <li className="hover:text-[#D8A7B1] transition duration-300 cursor-pointer">
            <Link to="contact">Contact</Link>
          </li>
          <li
            className={`${
              loggedIn ? "hidden" : ""
            } hover:text-[#D8A7B1] transition duration-300 cursor-pointer`}
            onClick={toggleDisplayAuthForm}
          >
            Sign In
          </li>
          <li
            className={`${
              loggedIn ? "" : "hidden"
            } hover:text-[#D8A7B1] transition duration-300 cursor-pointer`}
          >
            Log Out
          </li>
        </ul>
      )}
      <AuthForm />
      <Logout />
    </nav>
  );
}
