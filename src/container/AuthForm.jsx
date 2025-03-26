// const { displayAuthForm } = loadSetting();
//   const { toggleDisplayAuthForm } = updateSetting();
import { useState } from "react";
import { X, Mail, Lock, User } from "lucide-react";
import { loadSetting, updateSetting } from "../context/SettingContext";

export default function AuthForm() {
  const { displayAuthForm } = loadSetting();
  const { toggleDisplayAuthForm, loginUser, createUser } = updateSetting();
  const [formData, setFormData] = useState({
    email: "admin@gmail.com ",
    password: "password",
    name: "",
  });
  const [errors, setErrors] = useState({ email: "", password: "", name: "" });
  const [isLogin, setIsLogin] = useState(true);

  const validate = () => {
    let valid = true;
    let newErrors = { email: "", password: "", name: "" };

    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    if (!isLogin && !formData.name) {
      newErrors.name = "Name is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // console.log("Form submitted", formData,isLogin);
      if (isLogin) {
        loginUser(formData);
      } else {
        createUser(formData);
      }
    }
  };

  if (!displayAuthForm) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bgopa50 backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 md:w-96 relative">
        <button
          onClick={toggleDisplayAuthForm}
          className="absolute top-3 right-3 cursor-pointer text-gray-600 hover:text-red-500"
        >
          <X size={20} />
        </button>
        <h2 className="text-2xl font-bold text-gray-700 text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit} className="mt-4">
          {!isLogin && (
            <div className="mb-4 relative">
              <User className="absolute left-3 top-3 text-gray-600" size={18} />
              <input
                type="text"
                placeholder="Name"
                className="w-full p-2 pl-10 border rounded-lg bg-gray-100 text-gray-700 focus:outline-none"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>
          )}
          <div className="mb-4 relative">
            <Mail className="absolute left-3 top-3 text-gray-600" size={18} />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 pl-10 border rounded-lg bg-gray-100 text-gray-700 focus:outline-none"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="mb-4 relative">
            <Lock className="absolute left-3 top-3 text-gray-600" size={18} />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 pl-10 border rounded-lg bg-gray-100 text-gray-700 focus:outline-none"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-gray-700 text-white font-bold py-2 rounded-lg hover:bg-gray-600 transition duration-300"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p
          className="text-center text-gray-600 mt-4 cursor-pointer hover:underline"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Sign up"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}
