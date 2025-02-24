
import { useState } from "react";
import { useNavigate } from "react-router";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { base_url } from "../../Hunter";
import Toast from './Toast'; // Import the Toast component

function Login() {
  const [LoginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  
  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...LoginInfo, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = LoginInfo;
    if (!email || !password) {
      setToastMessage("Email and password are required!"); // Set toast message
      setToastVisible(true); // Show toast
      return;
    }
    try {
      const url = `${base_url}/Login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(LoginInfo),
      });
      const result = await response.json();
      const { success, message, jwtoken, name } = result;
      
      if (success) {
        setToastMessage(message); // Set success toast message
        setToastVisible(true); // Show toast
        localStorage.setItem("token", jwtoken);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => navigate("/HomePage"), 1000); // Navigate after toast
      } else {
        if (message.toLowerCase().includes("incorrect password")) {
          setToastMessage("Incorrect password! Please try again."); // Set password error message
        } else {
          setToastMessage(message); // Set general error message
        }
        setToastVisible(true); // Show toast
      }
    } catch (err) {
      setToastMessage("Login failed. Try again!"); // Set error toast message
      setToastVisible(true); // Show toast
    }
  };
  

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem("loggedInUser", user.displayName);
      setToastMessage(`Welcome, ${user.displayName}!`); // Set success toast message
      setToastVisible(true); // Show toast
      setTimeout(() => navigate("/HomePage"), 2000); // Navigate after toast
    } catch (error) {
      setToastMessage(error.message); // Set error toast message
      setToastVisible(true); // Show toast
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-900 via-pink-800 to-rose-800 px-4">
      <div className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-white text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={LoginInfo.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-pink-400"
              autoFocus
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-white text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={LoginInfo.password}
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

        {/* Google Sign-In Button */}
        <div className="mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center p-3 bg-white text-pink-700 border border-white hover:bg-gray-200 rounded-lg transition duration-300 font-semibold shadow-md"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google Icon" className="w-5 h-5 mr-2" />
            Sign In with Google
          </button>
        </div>

        {/* Signup Link */}
        <div className="mt-6 text-center">
          <p className="text-white">
            Don't have an account?{" "}
            <button onClick={() => navigate("/Signup")} className="text-pink-300 hover:text-pink-500 font-semibold">
              Signup
            </button>
          </p>
        </div>

        {/* Toast Notification */}
        {toastVisible && <Toast message={toastMessage} onClose={() => setToastVisible(false)} />}
      </div>
    </div>
  );
}

export default Login;
