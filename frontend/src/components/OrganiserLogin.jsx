
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { base_url } from "../../Hunter";
import "react-toastify/dist/ReactToastify.css"; // Ensure you import the CSS file

function OrganiserLogin() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      return toast.error("Email and password are required!", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
        hideProgressBar: true,
        closeButton: false,
        className: "custom-toast-error",
      });
    }

    try {
      const url = `${base_url}/Organiser-Login`;
      const response = await axios.post(url, loginInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { success, message } = response.data;
      if (success) {
        toast.success(message, {
          position: "top-center",
          autoClose: 3000,
          theme: "colored",
          hideProgressBar: true,
          closeButton: false,
          className: "custom-toast-success",
        });
        navigate("/Events");
      } else {
        toast.error(message, {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
          hideProgressBar: true,
          closeButton: false,
          className: "custom-toast-error",
        });
      }
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message || "An error occurred on the server", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
          hideProgressBar: true,
          closeButton: false,
          className: "custom-toast-error",
        });
      } else {
        toast.error(err.message || "Network error occurred", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
          hideProgressBar: true,
          closeButton: false,
          className: "custom-toast-error",
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-900 via-pink-800 to-rose-800 px-4">
      <div className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Organiser Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-white text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={loginInfo.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-white text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={loginInfo.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full p-3 bg-pink-600 hover:bg-pink-500 text-white rounded-lg transition duration-300 font-semibold shadow-md"
          >
            Login
          </button>
        </form>

        {/* Signup Link */}
        <div className="mt-6 text-center">
          <p className="text-white">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/OrganiserSignup")}
              className="text-pink-300 hover:text-pink-500 font-semibold"
            >
              Signup
            </button>
          </p>
        </div>

        {/* Toast Container */}
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={true}
          closeButton={false}
        />
      </div>
    </div>
  );
}

export default OrganiserLogin;
