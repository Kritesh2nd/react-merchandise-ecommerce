import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

import img from "../../assets/images/game_bg13.jpeg";
import background from "../../assets/images/game_bg3.jpeg";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Validate form
  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email.";
    }
    if (!formData.message.trim())
      newErrors.message = "Message cannot be empty.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <div className="min-h-screen  flex flex-col items-center">
      {/* Hero Section */}
      <div
        className="w-full bg-cover bg-center py-20 text-center"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-4xl font-bold text-white">Contact Us</h1>
        <p className="text-lg text-white mt-2">
          Reach out to us for any inquiries or support regarding our game
          merchandise.
        </p>
      </div>

      {/* Contact Details */}
      <div className="flex flex-col md:flex-row gap-6 mt-8">
        <div className="bg-white p-6 rounded-2xl shadow-lg text-center flex flex-col items-center">
          <Mail className="w-6 h-6 text-[#FF6961]" />
          <h3 className="text-lg font-semibold mt-2">Email</h3>
          <p className="text-[#3D3B40]">support@gamemerch.com</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg text-center flex flex-col items-center">
          <Phone className="w-6 h-6 text-[#A3E4DB]" />
          <h3 className="text-lg font-semibold mt-2">Phone</h3>
          <p className="text-[#3D3B40]">+1 (555) 123-4567</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg text-center flex flex-col items-center">
          <MapPin className="w-6 h-6 text-[#F9D976]" />
          <h3 className="text-lg font-semibold mt-2">Location</h3>
          <p className="text-[#3D3B40]">123 Gamer Street, Pixel City</p>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="mt-8 flex flex-col md:flex-row items-center gap-8  p-8 rounded-2xl border border-stone-600 w-full max-w-4xl bg-[#F4EAE6] mb-20">
        {/* Contact Image */}
        <div className="hidden md:block w-1/2">
          <img src={img} alt="Contact" className="w-full h-auto rounded-lg" />
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="w-full md:w-1/2 ">
          <div className="mb-4">
            <label className="block text-[#3D3B40] font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-[#A1C3D1] outline-none"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-[#FF6961] text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-[#3D3B40] font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-[#A1C3D1] outline-none"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-[#FF6961] text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-[#3D3B40] font-semibold">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-[#A1C3D1] outline-none"
              placeholder="Write your message"
              rows="4"
            />
            {errors.message && (
              <p className="text-[#FF6961] text-sm mt-1">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-[#A3E4DB] text-[#3D3B40] px-6 py-3 rounded-lg font-semibold hover:bg-[#A1C3D1] transition-all"
          >
            <Send className="w-5 h-5" /> Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
