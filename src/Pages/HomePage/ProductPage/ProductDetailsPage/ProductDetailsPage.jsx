import { useEffect, useState } from "react";
import { ShoppingCart, Minus, Plus, Star } from "lucide-react";
import ScrollToTop from "../../ScrollToTop/ScrollToTop";
import { motion, AnimatePresence } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";

const products = [
  {
    id: 1,
    title: "24 Medium Square...",
    ProductPrice: 133,
    oldPrice: 521,
    discount: "−74%",
    rating: 4.9,
    sold: "3000+ sold",
    shop: "Dollar Express",
    totalcupon:100,
    remaining:90,
    solds:10,
    save: "Save $3.88",
    img: "https://luckyshop.com.bd/storage/media/1755612936_0720751_vivo-topping-whipping-cream-11-ltr.webp",
  },
  {
    id: 2,
    title: "Airs Pro Wireless...",
    ProductPrice: 99,
    oldPrice: 62,
    discount: "−89%",
    rating: 4.3,
    totalcupon:200,
    remaining:10,
    solds:190,
    sold: "10,000+ sold",
    shop: "Tech Store",
    save: "New shoppers save $8.63",
    img: "https://luckyshop.com.bd/storage/media/1755612794_0251747_kazi-farms-chicken-strips-250gm.jpeg",
  },
  {
    id: 3,
    title: "60D80D100D Thic...",
    ProductPrice: 226,
    oldPrice: 491,
    discount: "−54%",
    rating: 4.9,
    totalcupon:300,
    remaining:80,
    solds:220,
    sold: "2000+ sold",
    shop: "Beauty Hub",
    save: "Save $2.65",
    img: "https://luckyshop.com.bd/storage/media/1755612590_0720823_kelloggs-froot-loops-285gm.webp",
  },
  {
    id: 4,
    title: "Continuous Fire Pistol...",
    ProductPrice: 99,
    oldPrice: 105,
    discount: "−90%",
    rating: 5.0,
    totalcupon:500,
    remaining:200,
    solds:300,
    sold: "160 sold",
    shop: "Toys World",
    save: "New shoppers save $9.59",
    img: "https://luckyshop.com.bd/storage/media/1755612458_0732214_mr-noodles-magic-masala-28-pcs-box.webp",
  },
  {
    id: 5,
    title: "Women Short Smart Wallet",
    ProductPrice: 133,
    oldPrice: 539,
    discount: "−75%",
    rating: 4.9,
    totalcupon:100,
    remaining:40,
    solds:60,
    sold: "4000+ sold",
    shop: "Dollar Express",
    save: "Save $4.06",
    img: "https://luckyshop.com.bd/storage/media/1755610807_0320334_kidstar-baby-diaper-small-66pcs-3-8-kg.jpeg",
  },
  {
    id: 6,
    title: "Wireless Earbuds Pro",
    ProductPrice: 399,
    oldPrice: 125,
    discount: "−68%",
    rating: 4.7,
    totalcupon:600,
    remaining:200,
    solds:300,
    sold: "2500+ sold",
    shop: "Sound Hub",
    save: "Save $8.51",
    img: "https://luckyshop.com.bd/storage/media/1755612590_0720823_kelloggs-froot-loops-285gm.webp",
  },
];

export default function ProductDetailsPage() {
  const [qty, setQty] = useState(1);
   const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const total = 180;
  const sold = 8;
  const remaining = total - sold;
  const myTickets = 0;
  const progress = (sold / total) * 100;

  const thumbs = [
    "https://sellularr.netlify.app/images/11.jpg",
    "https://sellularr.netlify.app/images/guiter.jpg",
    "https://sellularr.netlify.app/images/pp1.jpg",
    "https://sellularr.netlify.app/images/11.jpg",
  ];


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewInput, setReviewInput] = useState("");
  const [ratingInput, setRatingInput] = useState(5);
  const [index, setIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(2);

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reviewInput.trim() === "") return;

    setReviews([
      ...reviews,
      { text: reviewInput, rating: ratingInput, id: Date.now() },
    ]);

    setReviewInput("");
    setRatingInput(5);
    toggleModal();
  };

   // Detect screen width and adjust items per view
    useEffect(() => {
      const updateItemsPerView = () => {
        if (window.innerWidth < 768) {
          setItemsPerView(2); // Mobile/Tablet
        } else {
          setItemsPerView(5); // Desktop
        }
      };
      updateItemsPerView();
      window.addEventListener("resize", updateItemsPerView);
      return () => window.removeEventListener("resize", updateItemsPerView);
    }, []);
  
    useEffect(() => {
      const interval = setInterval(() => nextSlide(), 8000);
      return () => clearInterval(interval);
    }, [itemsPerView]);
  
    const nextSlide = () =>
      setIndex((prev) => (prev + itemsPerView) % products.length);
    const prevSlide = () =>
      setIndex(
        (prev) => (prev - itemsPerView + products.length) % products.length
      );
  
    const visibleProducts = Array.from({ length: itemsPerView }, (_, i) => {
      return products[(index + i) % products.length];
    });
  
  return (
    <div className="bg-gray-50 min-h-screen py-6 px-4">
      <ScrollToTop/>
      {/* ---------- OUTER GRID: (LEFT+MIDDLE) | RIGHT ---------- */}
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-[7fr_3fr] gap-8">
        
        {/* ================= LEFT + MIDDLE WRAPPER ================= */}
        <div className="space-y-8">
          {/* ---------- INNER GRID: LEFT | MIDDLE ---------- */}
          <div className="grid grid-cols-1 md:grid-cols-[3fr_4fr] gap-8">

            {/* ---------- LEFT: Image gallery ---------- */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-4 flex items-center justify-center">
                <img
                  src="https://sellularr.netlify.app/images/11.jpg"
                  alt="Main product"
                  className="max-h-[420px] max-w-full object-contain"
                />
              </div>

              <div className="grid grid-cols-4 gap-3">
                {thumbs.map((src, i) => (
                  <button
                    key={i}
                    className="border border-gray-200 rounded-xl p-1 hover:border-emerald-600 hover:shadow transition"
                  >
                    <img
                      src={src}
                      alt={`thumb-${i}`}
                      className="object-contain h-20 w-full"
                    />
                  </button>
                ))}
              </div>

                <div className="max-w-xl mx-auto p-4 bg-white rounded-xl shadow-md">
        <h3 className="text-xl font-bold">Description</h3>

        <p className={`text-sm text-gray-600 mt-3 leading-relaxed transition-all duration-300 ${isExpanded ? "max-h-full" : "line-clamp-4"}`}>
        <span className="font-semibold ">Efficient protection:</span> High-strength 9H tempered glass keeps your screen scratch-free while maintaining HD clarity. This glass also provides anti-fingerprint coating and shatter resistance, ensuring your device stays pristine. Its ultra-thin design does not affect touch sensitivity or display brightness. Perfect for daily use and long-term protection, giving you peace of mind.
      </p>

      <button
        onClick={toggleExpand}
        className="mt-2 text-sm text-green-600 font-semibold hover:text-green-800 transition-colors"
      >
        {isExpanded ? "Read Less ▲" : "Read More ▼"}
      </button>
    </div>
            </div>

            {/* ---------- MIDDLE: Product details ---------- */}
            <div className="space-y-6">
              <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
                Misxi 2 Pack Hard PC Case with Tempered Glass for 49 mm Apple Watch Ultra 2 / Ultra
              </h1>

              <p className="text-gray-600">
                Thin protective case with built-in screen protector, shock-resistant frame, Black.
              </p>

              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-gray-300" />
                ))}
                <span className="text-sm text-gray-500">(No Ratings)</span>
              </div>

              <div className="text-2xl md:text-3xl font-bold text-emerald-600">BDT 2179</div>
              <p className="text-sm text-gray-500">
                4K+ bought · <span className="text-green-600 font-medium">In stock</span>
              </p>

              {/* Size */}
              <div className="space-y-2">
                <h2 className="font-semibold">Size</h2>
                <div className="flex flex-wrap gap-2">
                  {["38mm","40mm","41mm","42mm","44mm","45mm","46mm","49mm"].map((size) => (
                    <button
                      key={size}
                      className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:border-emerald-600 transition"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div className="space-y-2">
                <h2 className="font-semibold">Color : Black (2-Pack)</h2>
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <button
                      key={i}
                      className="w-12 h-12 border border-gray-300 rounded-lg hover:border-emerald-600 transition"
                    >
                      <img
                        src="https://m.media-amazon.com/images/I/51QQROVVhyL._SS64_.jpg"
                        alt="color"
                        className="object-contain mx-auto"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>9H tempered glass for premium scratch protection</li>
                <li>Shockproof PC frame with precise cutouts</li>
                <li>Thin, lightweight design for comfort</li>
              </ul>
            </div>
          </div>

          {/* ================= REVIEW SECTION spans both left + middle ================= */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              Customer Reviews & Ratings
            </h2>

            <p className="text-center text-gray-700 font-medium mb-6">
              No customers ratings
            </p>

            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8">
              {/* Star summary */}
              <div className="flex flex-col items-center md:items-start space-y-2">
                <div className="text-4xl font-bold text-emerald-600">0.0</div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.91c.969 0 1.371 1.24.588 1.81l-3.973 2.888a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.973 2.888c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.364-1.118L1.67 10.1c-.783-.57-.38-1.81.588-1.81h4.91a1 1 0 00.95-.69l1.518-4.674z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-500">0 reviews</p>
              </div>

              {/* Progress bars */}
              <div className="space-y-2">
                {[5,4,3,2,1].map(star => (
                  <div key={star} className="flex items-center gap-2">
                    <span className="w-12 text-sm text-gray-700">{star} Star</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full">
                      <div className="h-2 rounded-full bg-emerald-500" style={{ width: "0%" }} />
                    </div>
                    <span className="w-10 text-sm text-gray-500 text-right">0%</span>
                  </div>
                ))}
              </div>
            </div>

           <hr className="my-6 border-0 h-px bg-gray-300" />


            <div className="text-center">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6 max-w-3xl mx-auto">
      <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
        Customer Reviews & Ratings
      </h2>

      <p className="text-center text-gray-700 font-medium mb-6">
        {reviews.length === 0
          ? "No customers ratings"
          : `${reviews.length} review(s)`}
      </p>

      {/* Write Review Button */}
      <div className="text-center mb-6">
        <button
          onClick={toggleModal}
          className="px-5 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition"
        >
          Write a review
        </button>
        <p className="text-xs text-gray-500 mt-2">
          Only registered users can write reviews. Please login or register.
        </p>
      </div>

      {/* Display Reviews */}
   <div className="space-y-4">
  {reviews.map((r) => (
    <div
      key={r.id}
      className="flex gap-4 p-4  rounded-lg shadow-sm bg-white"
    >
      {/* Left: User Avatar */}
      <div className="flex-shrink-0">
        <img
          src={r.avatar || "https://static.vecteezy.com/system/resources/previews/046/035/385/non_2x/business-man-silhouette-man-with-suit-standing-illustration-business-man-logo-vector.jpg"}
          alt="user avatar"
          className="w-12 h-12 rounded-full object-cover border border-gray-300"
        />
      </div>

      {/* Right: Review Content */}
      <div className="flex-1 flex flex-col gap-1">
        {/* Top Row: Username, Verified, Rating */}
       

        {/* Star Rating */}
        <div className="flex gap-1 mt-1">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-3 ${i < r.rating ? "text-emerald-500" : "text-gray-300"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.91c.969 0 1.371 1.24.588 1.81l-3.973 2.888a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.973 2.888c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.364-1.118L1.67 10.1c-.783-.57-.38-1.81.588-1.81h4.91a1 1 0 00.95-.69l1.518-4.674z" />
            </svg>
          ))}
        </div>
         <div className="flex flex-wrap items-center gap-1">
          <span className="font-semibold text-gray-800 text-xs">{r.username || "Anonymous"} on Jul 15, 2025</span>
          {r.verified && (
            <span className="text-xs text-green-600 font-medium flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Verified Purchase
            </span>
          )}
        </div>

        {/* Review Text */}
        <p className="text-gray-700 text-xs  text-left">{r.text}</p>
      </div>
    </div>
  ))}
</div>



      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Background Overlay */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-40 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleModal}
            />
            {/* Modal Container */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <div className="bg-white rounded-xl shadow-lg p-6 w-11/12 max-w-md">
                <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Rating
                    </label>
                    <select
                      value={ratingInput}
                      onChange={(e) => setRatingInput(Number(e.target.value))}
                      className="w-full border-gray-300 border rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    >
                      {[5, 4, 3, 2, 1].map((star) => (
                        <option key={star} value={star}>
                          {star} Star{star > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Review</label>
                    <textarea
                      value={reviewInput}
                      onChange={(e) => setReviewInput(e.target.value)}
                      rows={4}
                      className="w-full border-gray-300 border rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
                      placeholder="Write your review here..."
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={toggleModal}
                      className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
           
            </div>
          </div>
        </div>

        {/* ================= RIGHT: Purchase & shipping ================= */}
       <div>
         <div className="bg-white rounded-2xl border border-gray-100  md:h-[865px] shadow-xl p-6 space-y-6">
          {/* Price card */}
          <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-emerald-50 to-white p-4 shadow-inner">
            <div className="grid grid-cols-2 text-center text-sm font-medium">
              <div>
                <p className="text-2xl font-bold text-emerald-700">৳ 2,172</p>
                <p className="text-gray-500">Product Price</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-500">৳ 10</p>
                <p className="text-gray-500">Coupon Price</p>
              </div>
            </div>
          </div>

          <p className="text-gray-600 text-center text-sm">
            Order now and get it around{" "}
            <span className="font-semibold text-gray-800">Thursday, September 11</span>
          </p>

          {/* Quantity */}
          <div className="flex items-center justify-center md:justify-start">
            <span className="text-sm font-semibold text-gray-700">Quantity:</span>
            <div className="flex ms-2 items-center p-2 border border-gray-300 rounded-lg w-32 overflow-hidden shadow-sm">
              <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)} className="px-3 py-1 hover:bg-gray-100 transition">
                <Minus size={16} />
              </button>
              <span className="flex-1 text-center font-medium">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-3 py-1 hover:bg-gray-100 transition">
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Coupon progress */}
          <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-4 shadow-inner">
            <div className="grid grid-cols-2 sm:grid-cols-3 text-center text-sm font-medium gap-y-2">
              <div><p className="text-lg font-semibold text-green-600">{sold}</p><p className="text-gray-500">SOLD</p></div>
              <div><p className="text-lg font-semibold text-orange-500">{remaining}</p><p className="text-gray-500">REMAINING</p></div>
              <div><p className="text-lg font-semibold text-blue-600">{myTickets}</p><p className="text-gray-500">TICKETS</p></div>
              <div><p className="text-lg font-semibold text-purple-600">{progress.toFixed(1)}%</p><p className="text-gray-500">PROGRESS</p></div>
            </div>
            <div className="mt-3 h-2 w-full rounded-full bg-gray-200">
              <div className="h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-2 text-center text-xs text-gray-600">
              {sold} of {total} coupons sold
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button className="border border-emerald-600 text-emerald-600 py-2 rounded-xl font-medium hover:bg-emerald-50 transition">
              Buy Coupon
            </button>
            <button className="flex items-center justify-center gap-2 bg-emerald-600 text-white py-2 rounded-xl font-medium hover:bg-emerald-700 transition">
              <ShoppingCart size={18} /> Add to Cart
            </button>
            <button className="col-span-2 border border-emerald-600 text-emerald-600 py-2 rounded-xl font-medium hover:bg-emerald-50 transition">
              Buy Now
            </button>
          </div>

          {/* Extra Info */}
          <div className="text-sm text-gray-600 space-y-2">
            <p className="flex items-center gap-1">
              <span role="img" aria-label="lock">🔒</span> Secured transaction
            </p>
            <div className="flex items-center gap-4 mt-2">
              <img src="https://sellularr.netlify.app/images/fedex.svg" alt="FedEx" className="h-5" />
              <img src="https://sellularr.netlify.app/images/dhl.svg" alt="DHL" className="h-5" />
            </div>
            <p className="font-semibold mt-3">Features & Benefits</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Compatible with Apple Watch Ultra 49 mm</li>
              <li>9H tempered glass for scratch protection</li>
              <li>Button cover included for full protection</li>
              <li>Precise design allows access to all features</li>
            </ul>
          </div>
        </div>

          <div className="relative flex items-center">
                <button
                  onClick={prevSlide}
                  className="absolute -left-4 z-10 bg-white shadow-[0_2px_18px_rgba(0,0,0,0.15)] hover:bg-gray-100 p-2 rounded-full"
                >
                  <MdChevronLeft className="text-2xl text-gray-700" />
                </button>
        
                <div className="overflow-hidden w-full">
                  <div
                    className={`grid -mt-3  mb-10 items-start transition-transform duration-700 ease-in-out ${
                      itemsPerView === 2 ? "grid-cols-2" : "grid-cols-2"
                    }`}
                  >
                    {visibleProducts.map((product) => (
                      <Link
                        to="/productdetails"
                        key={product.id}
                        className="group ms-2 me-2 mt-5 bg-white rounded-md overflow-hidden shadow-[0_2px_18px_rgba(0,0,0,0.15)] hover:shadow-lg transition transform hover:-translate-y-1 flex flex-col"
                      >
                        {/* Product Image */}
                        {/* Product Image */}
                        <div className="relative h-40 w-full flex items-center justify-center bg-white">
                          <img
                            src={product.img}
                            alt={product.title}
                            className="max-h-full w-auto object-contain"
                          />
                          <button className="absolute bottom-2 right-2 bg-gradient-to-r from-[#8CD005] to-[#19745B] p-2 rounded-full shadow hover:opacity-90">
                            <FiShoppingCart className="text-white" />
                          </button>
                        </div>
        
                        {/* Product Info */}
                        <div className="p-2 flex-grow">
                          <div className="flex gap-1 mb-1 text-xs font-semibold">
                            <span className="bg-yellow-300 text-black px-1 rounded">
                              Choice
                            </span>
                            <span className="bg-red-500 text-white px-1 rounded">
                              Sale
                            </span>
                          </div>
                          <p className="text-sm font-medium text-gray-700 truncate">
                            {product.title}
                          </p>
                          <div className="flex items-center gap-2">
                            <p className="text-red-600 font-bold">
                              <span className="price-container">
                                <span className="main-price">
                                  <span className="symbol">৳</span>
                                  <span className="quicktectaka">
                                    {product.ProductPrice}
                                  </span>
                                </span>
                              </span>
                            </p>
        
                            <p className="main-symbol line-through text-gray-400 text-xs">
                              <span className="symbols">৳</span>
                              <span className="quicktectakas">{product.oldPrice}</span>
                            </p>
        
                            <p className="text-red-500 text-xs">{product.discount}</p>
                          </div>
                          <div className="flex items-center text-xs text-gray-600 mt-1">
                            {/* <FaStar className="text-yellow-400 mr-1" />
                            {product.rating}
                            <span className="ml-1">| {product.sold}</span> */}
                             {/* Progress Bar */}
                          <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                    <div
                      className="h-1 rounded-full bg-[#19745B] transition-all duration-500"
                      style={{
                        width: `${(product.solds / product.totalcupon) * 100}%`,
                      }}
                    ></div>
                  </div>
                          </div>
        
                          <div className="bg-gray-50 rounded-lg p-1 shadow-[0_2px_18px_rgba(0,0,0,0.15)] mt-2 w-full">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                              {/* Sold and Price - side by side on mobile */}
                              <div className="flex w-full sm:w-2/3 justify-between mb-3 sm:mb-0">
                                {/* Sold */}
                                <div className="flex flex-col items-center w-1/2">
                                  <span className="text-xs font-bold text-green-600">
                                    {product.solds} / {product.totalcupon}
                                  </span>
                                  <span className="text-[10px] text-gray-500">
                                    Sold
                                  </span>
                                </div>
        
                                {/* Price */}
                                <div className="flex flex-col items-center w-1/2">
                                  <span className="text-sm font-bold text-yellow-600 ">
                                    ৳500
                                  </span>
                                  <span className="text-[10px] text-gray-500 ">
                                    Coupon
                                  </span>
                                </div>
                              </div>
        
                              {/* Remaining */}
                              <div className="flex flex-col items-center w-full sm:w-1/3">
                                <span className="text-xs font-bold text-gray-800">
                                 {product.remaining}
                                </span>
                                <span className="text-[10px] text-gray-500">
                                  Remaining
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
        
                        {/* Hidden Buttons */}
                        {/* -------- Hover Buttons -------- */}
                        <div className="overflow-hidden max-h-0 mb-2 group-hover:max-h-28 transition-all duration-500 px-2 flex flex-col gap-2">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation(); // ⛔ stop navigation
                              console.log("Buy Coupon:", product.id);
                            }}
                            className="w-full bg-[#19745B] text-white text-xs font-semibold py-2 rounded shadow hover:opacity-90 transition"
                          >
                            Buy Coupon
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation(); // ⛔ stop navigation
                              // handleAddToCart(product);
                              console.log("Add to Cart:", product.id);
                            }}
                            className="w-full bg-[#19745B] text-white text-xs font-semibold py-2 rounded shadow hover:opacity-90 transition"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
        
                <button
                  onClick={nextSlide}
                  className="absolute  -right-4 z-10 bg-white shadow hover:bg-gray-100 p-2 rounded-full"
                >
                  <MdChevronRight className="text-2xl text-gray-700" />
                </button>
              </div>
       </div>
          
        
      </div>
    </div>
  );
}
