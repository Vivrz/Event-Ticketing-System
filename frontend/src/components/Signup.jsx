import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { handlerror, handleSuccess } from "./util";
import { useNavigate } from "react-router";
import { base_url } from "../../Hunter";

function Signup() {
  const [signupInfo, setsignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setsignupInfo({ ...signupInfo, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handlerror("Name, email, and password are required!");
    }
    try {
      const url = `${base_url}/Signup`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { success, message } = result;
      if (success) {
        handleSuccess(message);
        navigate("/Login");
      }
    } catch (err) {
      handlerror("Signup failed. Try again!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-900 via-pink-800 to-rose-800 px-4">
      <div className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Signup</h1>

        <form onSubmit={handleSignup} className="space-y-4">
          {/* Name Input */}
          <div>
            <label className="block text-white text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={signupInfo.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full p-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-pink-400"
              autoFocus
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-white text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={signupInfo.email}
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
              value={signupInfo.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full p-3 bg-pink-600 hover:bg-pink-500 text-white rounded-lg transition duration-300 font-semibold shadow-md"
          >
            Signup
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-white">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/Login")}
              className="text-pink-300 hover:text-pink-500 font-semibold"
            >
              Login
            </button>
          </p>
        </div>

        {/* Toast Container */}
        <ToastContainer />
      </div>
    </div>
  );
}

export default Signup;
