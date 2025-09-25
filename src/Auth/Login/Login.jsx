import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import ScrollToTop from "../../Pages/HomePage/ScrollToTop/ScrollToTop";
import useFirebase from "../../Pages/Hooks/useFirebase";

export default function Login() {
  const navigate = useNavigate();
  const { loginWithPhoneAndPass } = useFirebase();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    loginWithPhoneAndPass(phone, password, navigate);
  };

  return (
    <div className="mt-7 flex items-center justify-center bg-gray-50">
      <ScrollToTop />
      <div className="bg-white w-full max-w-4xl shadow-[0_2px_18px_rgba(0,0,0,0.15)] rounded-md flex overflow-hidden">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-sm font-bold mb-4">WELCOME TO Lucky Shop</h2>

          {/* Tabs */}
          <div className="flex mb-4">
            <button
              onClick={() => navigate("/login")}
              className={`w-1/2 py-2 text-sm font-semibold border ${
                window.location.pathname === "/login"
                  ? "bg-[#19745B] text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => navigate("/registration")}
              className={`w-1/2 py-2 text-sm font-semibold border-l ${
                window.location.pathname === "/registration"
                  ? "bg-[#19745B] text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="flex gap-2">
              <input
                type="tel"
                placeholder="Phone Number*"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
                required
              />
            </div>

            <input
              type="password"
              placeholder="Password*"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
              required
            />

            <label className="flex items-start gap-2 text-xs">
              <Link>
                <span className="text-gray-600">Forgot Your Password?</span>
              </Link>
            </label>

            <button
              type="submit"
              className="w-full font-semibold py-2 rounded-md bg-[#19745B] text-white hover:bg-gray-800"
            >
              Login
            </button>
          </form>

          {/* OR Divider */}
          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-2 text-sm text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Social Register Buttons */}
          <div className="space-y-2">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 font-medium shadow-sm transition-all duration-300 hover:shadow-md hover:bg-gray-50 hover:border-gray-400">
              <FcGoogle size={18} /> Register with Google
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex flex-col justify-between w-1/2 bg-white border-1 border-gray-200 p-8 text-sm">
          <div className="space-y-2">
            <p className="flex items-center gap-2 text-green-600">✅ Delivering in 10000+ Cities</p>
            <p className="flex items-center gap-2 text-green-600">✅ Presence in 6 Continents</p>
            <p className="flex items-center gap-2 text-green-600">✅ 100 Million Products</p>
            <p className="flex items-center gap-2 text-green-600">✅ 10 Million Happy Customers & Counting</p>

            {/* QR Section */}
            <div className="flex mt-10 items-start">
              <div>
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=sellular-app"
                  alt="QR Code"
                  className="w-20 h-20"
                />
              </div>
              <div className="ms-5">
                <p className="mt-2 font-bold">DON’T HAVE SELLAR APP?</p>
                <p>Download it here!</p>
                <p>Scan the QR code</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
