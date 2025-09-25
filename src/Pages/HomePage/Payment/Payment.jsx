// import { useState } from "react";
import ScrollToTop from "../ScrollToTop/ScrollToTop";

export default function Payment() {
  // const [isDefault, setIsDefault] = useState(true);

  return (
    <div className="mx-auto max-w-6xl p-6 bg-gray-50 min-h-screen">
      <ScrollToTop />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* ========== LEFT: Shipping Form ========== */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-gray-200 shadow-xl">
          {/* Contact Information */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h2>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border border-gray-300 rounded-xl px-5 py-2 text-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none transition shadow-sm"
            />
            <p className="text-xs text-gray-500 mt-1">Please enter your full name.</p>
          </div>

          {/* Phone Number */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Phone Number</h2>
            <div className="flex">
              <input
                type="text"
                value="+880"
                readOnly
                className="border border-gray-300 rounded-l-xl px-5 py-2 w-24 bg-gray-100 text-gray-600 focus:outline-none shadow-sm"
              />
              <input
                type="tel"
                placeholder="Phone number"
                className="flex-1 border border-gray-300 rounded-r-xl px-5 py-2 text-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none transition shadow-sm"
              />
            </div>
          </div>

          {/* Address */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Address</h2>
            <textarea
              placeholder="Street Address, Apt, Suite, Unit, City, State, Postal Code"
              className="w-full border border-gray-300 rounded-2xl px-5 py-4 text-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none transition shadow-sm resize-none h-24"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full px-8 py-3 shadow-md transition-all duration-300">
              Confirm
            </button>
            <button className="border border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold rounded-full px-8 py-3 transition-all duration-300">
              Cancel
            </button>
          </div>
        </div>

        {/* ========== RIGHT: Order Summary ========== */}
        <div className="bg-white p-6 rounded-2xl shadow-xl border mb-40 pb-10 md:pb-0 border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span>Total Quantity:</span> <span>3</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal:</span> <span>1500 Taka</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span> <span>150 Taka</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span> <span>50 Taka</span>
            </div>
            <hr className="border-gray-200 my-2" />
            <div className="flex justify-between font-bold text-lg text-gray-900">
              <span>Grand Total:</span> <span>1700 Taka</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
