import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import ScrollToTop from "../../Pages/HomePage/ScrollToTop/ScrollToTop";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useFirebase from "../../Pages/Hooks/useFirebase";

export default function Registration() {
  const currentPath = window.location.pathname;
  const navigate = useNavigate();
  const navigates = useNavigate();
  const { googleSignIn } = useFirebase();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [referral, setReferral] = useState("");

  // 🔹 Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!/^\d{11}$/.test(phone)) {
      Swal.fire("Invalid!", "Enter a valid 11-digit Bangladeshi phone number", "warning");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: phone }),
      });
      const data = await res.json();
      if (data.success) {
        setOtpSent(true);
        Swal.fire("Success", "OTP sent successfully!", "success");
      } else {
        Swal.fire("Error", data.message || "Failed to send OTP", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Server error while sending OTP", "error");
    }
  };

  // 🔹 Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: phone, otp }),
      });
      const data = await res.json();
      if (data.success) {
        setOtpVerified(true);
        Swal.fire("Verified!", "OTP verified successfully!", "success");
      } else {
        Swal.fire("Error", data.message || "Invalid OTP", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Server error while verifying OTP", "error");
    }
  };

  // 🔹 Register User
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!otpVerified) {
      Swal.fire("Attention!", "Please verify OTP before registration", "warning");
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire("Error", "Passwords do not match!", "error");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: phone,
          password,
          displayName: phone, // ekhane iccha korle name input field add korte paro
          referralCode: referral || "",
        }),
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire("Success!", "User registered successfully!", "success");
        navigate("/login");
      } else {
        Swal.fire("Error", data.message || "Registration failed", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Server error while registering", "error");
    }
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
              className={`w-1/2 py-2 text-sm font-semibold ${
                currentPath === "/login" ? "bg-black text-white" : "bg-gray-200 text-black"
              }`}
            >
              Log In
            </button>

            <button
              onClick={() => navigate("/registration")}
              className={`w-1/2 py-2 text-sm font-semibold ${
                currentPath === "/registration" ? "bg-[#19745B] text-white" : "bg-gray-200 text-black"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleRegister}>
            {/* Phone Number */}
            <div className="flex gap-2">
              <input
                type="tel"
                placeholder="Phone Number *"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
                required
              />
              {!otpSent && (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="bg-[#19745B] text-white px-4 rounded-md text-sm font-semibold"
                >
                  Send OTP
                </button>
              )}
            </div>

            {/* OTP Field */}
            {otpSent && !otpVerified && (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="bg-green-600 text-white px-4 rounded-md text-sm font-semibold"
                >
                  Verify OTP
                </button>
              </div>
            )}

            {/* Passwords */}
            <div className="flex gap-2">
              <button
                type="button"
                className="bg-[#19745B] text-white px-3 text-xs font-bold rounded-md"
              >
                Password
              </button>
              <input
                type="password"
                placeholder="Password *"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
                required
              />
            </div>

            <input
              type="password"
              placeholder="Confirm Password *"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
              required
            />

            <input
              type="text"
              placeholder="Referral Code (Optional)"
              value={referral}
              onChange={(e) => setReferral(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
            />

            {/* Mailing List */}
            <label className="flex items-start gap-2 text-xs">
              <input type="checkbox" className="mt-1" />
              <span>
                Join <span className="font-semibold">Our Mailing List</span> - Get updates on
                Rollbacks, special pricing, hot new items, gift ideas and more.
              </span>
            </label>

            {/* Register Button */}
            <button
              type="submit"
              disabled={!otpVerified}
              className={`w-full font-semibold py-2 rounded-md transition ${
                otpVerified
                  ? "bg-[#19745B] text-white hover:bg-gray-800"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
            >
              Register
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
            <button  onClick={() => googleSignIn(navigates)} className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 font-medium shadow-sm transition-all duration-300 hover:shadow-md hover:bg-gray-50 hover:border-gray-400">
              <FcGoogle size={20} />
              Register with Google
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex flex-col justify-between w-1/2 bg-white border-1 border-gray-200 p-8 text-sm">
          <div className="space-y-2">
            <p className="flex items-center gap-2 text-green-600">✅ Delivering in 10000+ Cities</p>
            <p className="flex items-center gap-2 text-green-600">✅ Presence in 6 Continents</p>
            <p className="flex items-center gap-2 text-green-600">✅ 100 Million Products</p>
            <p className="flex items-center gap-2 text-green-600">
              ✅ 10 Million Happy Customers & Counting
            </p>

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
