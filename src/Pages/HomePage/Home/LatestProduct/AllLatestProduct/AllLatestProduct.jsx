import { useState, useMemo } from "react";
// import { FiShoppingCart } from "react-icons/fi";
import ScrollToTop from "../../../ScrollToTop/ScrollToTop";

// products array (ids unique করে দিয়েছি)
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
   {
    id: 7,
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
    id: 8,
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
    id: 9,
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
    id: 10,
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
];

const AllLatestProduct = () => {
  const [visibleCount, setVisibleCount] = useState(30); 
  const [sortOption, setSortOption] = useState("default");

  // Sorting logic (fixed)
  const sortedProducts = useMemo(() => {
    let arr = [...products];

    switch (sortOption) {
      case "name-asc":
        return arr.sort((a, b) => a.title.localeCompare(b.title));
      case "name-desc":
        return arr.sort((a, b) => b.title.localeCompare(a.title));
      case "price-low":
        return arr.sort((a, b) => a.price - b.price);
      case "price-high":
        return arr.sort((a, b) => b.price - a.price);
      default:
        return arr; // default order
    }
  }, [sortOption]);

  const loadMore = () => {
    setVisibleCount((c) => Math.min(c + 30, sortedProducts.length));
  };

  return (
    <div className="bg-white py-6 px-6 md:px-20">
      <ScrollToTop />

      {/* Header & Sort */}
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 bg-white shadow-[0_2px_18px_rgba(0,0,0,0.15)] rounded-md p-4 mb-6">
  {/* Title */}
  <h2 className="text-lg sm:text-xl font-bold text-gray-800 text-center sm:text-left flex-grow">
    Showing {Math.min(visibleCount, sortedProducts.length)} out of {products.length} products
  </h2>

  {/* Sort Dropdown */}
  <div className="flex items-center gap-3">
  {/* Label */}
  <label
    htmlFor="sort"
    className="text-sm font-semibold text-gray-700 tracking-wide"
  >
    Sort:
  </label>

  {/* Select */}
  <div className="relative">
    <select
      id="sort"
      value={sortOption}
      onChange={(e) => {
        setSortOption(e.target.value);
        setVisibleCount(30);
      }}
      className="appearance-none border border-gray-200 rounded-md px-4 py-2 pr-8 text-sm font-medium text-gray-700 shadow-sm bg-white cursor-pointer 
                 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
    >
      <option value="default">Default</option>
      <option value="name-asc">Name (A → Z)</option>
      <option value="name-desc">Name (Z → A)</option>
      <option value="price-low">Price (Low → High)</option>
      <option value="price-high">Price (High → Low)</option>
    </select>

    {/* Dropdown Arrow */}
    <svg
      className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  </div>
</div>

</div>


      {/* Products Grid */}
       <h2 className="text-xl font-bold text-gray-800 mt-10 mb-4">Latest Product</h2>
      <div className="overflow-hidden w-full">
        <div className="grid grid-cols-2 ms-2 me-2 mt-4 md:grid-cols-5 gap-4 mb-10 items-start transition-transform duration-700 ease-in-out">
          {sortedProducts.slice(0, visibleCount).map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-md overflow-hidden shadow-[0_2px_18px_rgba(0,0,0,0.15)] hover:shadow-lg transition transform hover:-translate-y-1 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-40 w-full flex items-center justify-center bg-white">
                <img
                  src={product.img}
                  alt={product.title}
                  className="max-h-full w-auto object-contain"
                />
                {/* <button className="absolute bottom-2 right-2 bg-gradient-to-r from-[#8CD005] to-[#19745B] p-2 rounded-full shadow hover:opacity-90">
                  <FiShoppingCart className="text-white" />
                </button> */}
              </div>

              {/* Info */}
              <div className="p-2 flex-grow">
                <div className="flex gap-1 mb-1 text-xs font-semibold">
                  <span className="bg-yellow-300 text-black px-1 rounded">Choice</span>
                  <span className="bg-red-500 text-white px-1 rounded">Sale</span>
                </div>
                <p className="text-sm font-medium text-gray-700 truncate">{product.title}</p>
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

                {/* Coupon Card */}
                <div className="bg-gray-50 rounded-lg p-1 shadow mt-2 w-full">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <div className="flex w-full sm:w-2/3 justify-between mb-3 sm:mb-0">
                      <div className="flex flex-col items-center w-1/2">
                        <span className="text-xs font-bold text-green-600"> {product.solds} / {product.totalcupon}</span>
                        <span className="text-[10px] text-gray-500">Sold</span>
                      </div>
                      <div className="flex flex-col items-center w-1/2">
                        <span className="text-sm font-bold text-yellow-600">৳500</span>
                        <span className="text-[10px] text-gray-500">Coupon</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center w-full sm:w-1/3">
                      <span className="text-xs font-bold text-gray-800">{product.remaining}</span>
                      <span className="text-[10px] text-gray-500">Remaining</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hidden Buttons */}
              <div className="overflow-hidden max-h-0 mb-2 group-hover:max-h-28 transition-all duration-500 px-2 flex flex-col gap-2">
                <button className="w-full bg-[#19745B] text-white text-xs font-semibold py-2 rounded shadow hover:opacity-90 transition">
                  Buy Coupon
                </button>
                <button className="w-full bg-[#19745B] text-white text-xs font-semibold py-2 rounded shadow hover:opacity-90 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Load More */}
      {visibleCount < sortedProducts.length && (
        <div className="flex justify-center">
          <button
            onClick={loadMore}
            className="bg-gradient-to-r from-[#8CD005] to-[#19745B] text-white font-semibold px-6 py-2 rounded shadow hover:opacity-90 transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default AllLatestProduct;
