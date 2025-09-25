import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    bg: "https://img.freepik.com/free-photo/shopping-concept-close-up-portrait-young-beautiful-attractive-redhair-girl-smiling-looking-camera_1258-118763.jpg?t=st=1758772265~exp=1758775865~hmac=d717a2ce08053aef95b076df1361e93ad663828f6f5c3edce0ffb6bff8deb078&w=1060",
    products: [
      { id: 1, img: "https://luckyshop.com.bd/storage/media/1755612590_0720823_kelloggs-froot-loops-285gm.webp", price: "$0.89", discount: "-60%" },
      { id: 2, img: "https://luckyshop.com.bd/storage/media/1755612794_0251747_kazi-farms-chicken-strips-250gm.jpeg", price: "$3.08" },
      { id: 3, img: "https://luckyshop.com.bd/storage/media/1755612590_0720823_kelloggs-froot-loops-285gm.webp", price: "$1.99" },
      { id: 4, img: "https://luckyshop.com.bd/storage/media/1755612794_0251747_kazi-farms-chicken-strips-250gm.jpeg", price: "$2.49" },
      { id: 5, img: "https://luckyshop.com.bd/storage/media/1755612590_0720823_kelloggs-froot-loops-285gm.webp", price: "$0.79" },
      { id: 6, img: "https://luckyshop.com.bd/storage/media/1755612794_0251747_kazi-farms-chicken-strips-250gm.jpeg", price: "$3.08" },
    ],
    texts: ["Welcome deal", "New shopper special", "Shop now"],
  },
  {
    id: 2,
    bg: "https://img.freepik.com/premium-photo/top-view-online-shopping-concept-with-credit-card-smart-phone-computer-isolated-office-yellow-table-background_315337-3591.jpg?ga=GA1.1.36830077.1758772257&semt=ais_hybrid&w=740&q=80",
    products: [
      { id: 1, img: "https://luckyshop.com.bd/storage/media/1755612590_0720823_kelloggs-froot-loops-285gm.webp", price: "$0.89", discount: "-60%" },
      { id: 2, img: "https://luckyshop.com.bd/storage/media/1755612794_0251747_kazi-farms-chicken-strips-250gm.jpeg", price: "$3.08" },
      { id: 3, img: "https://luckyshop.com.bd/storage/media/1755612590_0720823_kelloggs-froot-loops-285gm.webp", price: "$1.99" },
      { id: 4, img: "https://luckyshop.com.bd/storage/media/1755612794_0251747_kazi-farms-chicken-strips-250gm.jpeg", price: "$2.49" },
      { id: 5, img: "https://luckyshop.com.bd/storage/media/1755612590_0720823_kelloggs-froot-loops-285gm.webp", price: "$0.79" },
      { id: 6, img: "https://luckyshop.com.bd/storage/media/1755612794_0251747_kazi-farms-chicken-strips-250gm.jpeg", price: "$3.08" },
    ],
    texts: ["This product first view", "50% Bonus", "Limited time offer"],
  },
];

export default function PromoBanner() {
  const [current, setCurrent] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  // Left/right product sliding
  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(1);

  // Auto slide banner
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      setTextIndex(0);
      setLeftIndex(0);
      setRightIndex(1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Animate texts
  useEffect(() => {
    const textTimer = setInterval(() => {
      setTextIndex((prev) =>
        prev === slides[current].texts.length - 1 ? 0 : prev + 1
      );
    }, 2000);
    return () => clearInterval(textTimer);
  }, [current]);

  // Auto slide left/right products
  useEffect(() => {
    const productTimer = setInterval(() => {
      setLeftIndex((prev) => (prev + 1) % slides[current].products.length);
      setRightIndex((prev) => (prev + 1) % slides[current].products.length);
    }, 2000);
    return () => clearInterval(productTimer);
  }, [current]);

  const leftProduct = slides[current].products[leftIndex];
  const rightProduct = slides[current].products[rightIndex];

  return (
    <div className="relative w-full h-[250px] sm:h-[280px] md:h-[320px] lg:h-[360px] overflow-hidden shadow">
      {/* Background */}
      <img
        src={slides[current].bg}
        alt="banner"
        className="absolute w-full h-full object-cover"
      />

      {/* Center Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <AnimatePresence mode="wait">
          <motion.h2
            key={slides[current].texts[textIndex]}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-black bg-white/70 px-4 py-2 rounded-md shadow"
          >
            {slides[current].texts[textIndex]}
          </motion.h2>
        </AnimatePresence>
      </div>

      {/* Left Product */}
      <div className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2">
        <motion.div
          key={leftProduct.id + "l"}
          className="bg-white rounded-md shadow-lg p-1 sm:p-2 md:p-3 relative"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={leftProduct.img}
            alt="product"
            className="h-16 sm:h-20 md:h-24 lg:h-24 w-16 sm:w-20 md:w-24 lg:w-24 object-contain"
          />
          {leftProduct.price && (
            <span className="absolute top-1 left-1 sm:top-2 sm:left-2 text-[9px] sm:text-xs md:text-xs bg-black text-white px-1 py-0.5 rounded">
              {leftProduct.price}
            </span>
          )}
          {leftProduct.discount && (
            <span className="absolute top-1 right-1 sm:top-2 sm:right-2 text-[9px] sm:text-xs md:text-xs bg-red-600 text-white px-1 py-0.5 rounded-full">
              {leftProduct.discount}
            </span>
          )}
        </motion.div>
      </div>

      {/* Right Product */}
      <div className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2">
        <motion.div
          key={rightProduct.id + "r"}
          className="bg-white rounded-md shadow-lg p-1 sm:p-2 md:p-3 relative"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={rightProduct.img}
            alt="product"
            className="h-16 sm:h-20 md:h-24 lg:h-24 w-16 sm:w-20 md:w-24 lg:w-24 object-contain"
          />
          {rightProduct.price && (
            <span className="absolute top-1 left-1 sm:top-2 sm:left-2 text-[9px] sm:text-xs md:text-xs bg-black text-white px-1 py-0.5 rounded">
              {rightProduct.price}
            </span>
          )}
          {rightProduct.discount && (
            <span className="absolute top-1 right-1 sm:top-2 sm:right-2 text-[9px] sm:text-xs md:text-xs bg-red-600 text-white px-1 py-0.5 rounded-full">
              {rightProduct.discount}
            </span>
          )}
        </motion.div>
      </div>
    </div>
  );
}
