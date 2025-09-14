import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ShoppingCart, DollarSign, Package, User, Mail } from "lucide-react";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const { user } = useContext(AuthContext);

  if (!product || !product._id) return null;

  const hasImages = product.images && product.images.length > 0;
  const imageUrls = hasImages
    ? product.images.map((img) =>
        img.startsWith("http") ? img : `http://localhost:8000${img}`
      )
    : [];

  const farmerName = product.farmer?.name || "Unknown Farmer";
  const farmerEmail = product.farmer?.email || "No Email";

  const addToCart = () => {
    if (!user) return toast.error("Please login first!");
    if (user.role !== "customer")
      return toast.error("Only customers can add to cart");

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((c) => c._id === product._id);

    if (existing) existing.qty += 1;
    else
      cart.push({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: hasImages ? imageUrls[0] : null,
        qty: 1,
      });

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
      {/* Image Slider */}
      <div className="w-full h-48">
        {hasImages ? (
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            slidesPerView={1}
            className="w-full h-48"
          >
            {imageUrls.map((url, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={url}
                  alt={`${product.name}-${idx}`}
                  className="w-full h-48 object-cover rounded"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="w-full h-48 bg-gray-200 rounded flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <p className="text-gray-600 mt-1 flex items-center gap-1">
            <DollarSign className="w-4 h-4" /> ${product.price}
          </p>
          <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
            <Package className="w-4 h-4" /> Qty: {product.quantity || 0}
          </p>
        </div>

        {/* Farmer Info (only for customers) */}
        {user?.role === "customer" && (
          <div className="mt-3 text-sm space-y-1">
            <p className="flex items-center gap-2 text-gray-800 font-medium">
              <User className="w-4 h-4 text-gray-600" />
              {farmerName}
            </p>
            <p className="flex items-center gap-2 text-gray-600">
              <Mail className="w-4 h-4 text-gray-500" />
              {farmerEmail}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="mt-4 flex justify-between items-center">
          <Link
            to={`/product/${product._id}`}
            className="text-green-600 font-semibold hover:underline"
          >
            View
          </Link>

          {user?.role === "customer" && (
            <button
              onClick={addToCart}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-400 flex items-center gap-1 text-sm"
            >
              <ShoppingCart className="w-4 h-4" /> Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { ShoppingCart, DollarSign, Package, User } from "lucide-react";
// import toast from "react-hot-toast";

// export default function ProductCard({ product }) {
//   const { user } = useContext(AuthContext);

//   if (!product || !product._id) return null;

//   // Images: show fallback if empty
//   const hasImages = product.images && product.images.length > 0;
//   const imageUrls = hasImages
//     ? product.images.map((img) =>
//         img.startsWith("http") ? img : `http://localhost:8000${img}`
//       )
//     : [];

//   // Farmer info
//   const farmerName = product.farmer?.name || "Unknown Farmer";
//   const farmerEmail = product.farmer?.email || "No Email";

//   const addToCart = () => {
//     if (!user) return toast.error("Please login first!");
//     if (user.role !== "customer")
//       return toast.error("Only customers can add to cart");

//     const cart = JSON.parse(localStorage.getItem("cart") || "[]");
//     const existing = cart.find((c) => c._id === product._id);

//     if (existing) existing.qty += 1;
//     else
//       cart.push({
//         _id: product._id,
//         name: product.name,
//         price: product.price,
//         image: hasImages ? imageUrls[0] : null,
//         qty: 1,
//       });

//     localStorage.setItem("cart", JSON.stringify(cart));
//     toast.success(`${product.name} added to cart!`);
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
//       {/* Image Slider */}
//       <div className="w-full h-48">
//         {hasImages ? (
//           <Swiper
//             modules={[Navigation, Pagination]}
//             navigation
//             pagination={{ clickable: true }}
//             slidesPerView={1}
//             className="w-full h-48"
//           >
//             {imageUrls.map((url, idx) => (
//               <SwiperSlide key={idx}>
//                 <img
//                   src={url}
//                   alt={`${product.name}-${idx}`}
//                   className="w-full h-48 object-cover rounded"
//                 />
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         ) : (
//           <div className="w-full h-48 bg-gray-200 rounded flex items-center justify-center text-gray-500">
//             No Image
//           </div>
//         )}
//       </div>

//       {/* Product Info */}
//       <div className="p-4 flex flex-col flex-grow justify-between">
//         <div>
//           <h3 className="font-semibold text-lg">{product.name}</h3>
//           <p className="text-gray-600 mt-1 flex items-center gap-1">
//             <DollarSign className="w-4 h-4" /> ${product.price}
//           </p>
//           <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
//             <Package className="w-4 h-4" /> Qty: {product.quantity || 0}
//           </p>

//           {/* Show farmer info for customers */}
//           {user?.role === "customer" && (
//             <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
//               <User className="w-4 h-4" /> {farmerName} - {farmerEmail}
//             </p>
//           )}
//         </div>

//         {/* Actions */}
//         <div className="mt-4 flex justify-between items-center">
//           <Link
//             to={`/product/${product._id}`}
//             className="text-green-600 font-semibold hover:underline"
//           >
//             View
//           </Link>

//           {user?.role === "customer" && (
//             <button
//               onClick={addToCart}
//               className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-400 flex items-center gap-1 text-sm"
//             >
//               <ShoppingCart className="w-4 h-4" /> Add to Cart
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
