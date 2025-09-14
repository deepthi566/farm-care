import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  ShoppingCart,
  DollarSign,
  Package,
  User,
  Mail,
  Edit,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;
  if (!product)
    return <p className="text-center mt-10 text-lg">Product not found</p>;

  const farmerName = product.farmer?.name || "Unknown Farmer";
  const farmerEmail = product.farmer?.email || "No Email";

  // Add to cart
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
        image: product.images?.[0] || null,
        qty: 1,
      });

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success(`${product.name} added to cart!`);
  };

  // Edit product
  const handleEdit = () => {
    navigate(`/add-product?id=${product._id}`);
  };

  // Delete product
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await axios.delete(`http://localhost:8000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Product deleted successfully!");
      navigate("/my-products");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Title */}
      <h2 className="text-3xl font-bold mb-6">{product.name}</h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Image Section */}
        <div className="md:w-1/2">
          {product.images && product.images.length > 0 ? (
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              slidesPerView={1}
            >
              {product.images.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <img
                    src={
                      img.startsWith("http")
                        ? img
                        : `http://localhost:8000${img}`
                    }
                    alt={`${product.name}-${idx}`}
                    className="w-full h-96 object-cover rounded-lg shadow"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 shadow">
              No Image
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Description */}
            <p className="text-gray-700 text-base leading-relaxed">
              {product.description}
            </p>

            {/* Price & Quantity */}
            <p className="text-gray-800 font-semibold flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" /> ${product.price}
            </p>
            <p className="text-gray-600 flex items-center gap-2">
              <Package className="w-5 h-5 text-gray-500" /> Qty:{" "}
              {product.quantity || 0}
            </p>

            {/* Farmer Info */}
            <div className="pt-2 border-t border-gray-200">
              <p className="flex items-center gap-2 text-lg font-medium text-black">
                <User className="w-5 h-5 text-gray-700" />
                {farmerName}
              </p>
              <p className="flex items-center gap-2 text-gray-700 text-sm ml-1">
                <Mail className="w-4 h-4 text-gray-500" />
                {farmerEmail}
              </p>
            </div>
          </div>

          {/* Actions */}
          {user?.role === "customer" && (
            <button
              onClick={addToCart}
              className="mt-6 bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-400 flex items-center gap-2 shadow"
            >
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button>
          )}

          {user?.role === "farmer" && user._id === product.farmer?._id && (
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleEdit}
                className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-400 flex items-center gap-2 shadow"
              >
                <Edit className="w-5 h-5" /> Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-400 flex items-center gap-2 shadow"
              >
                <Trash2 className="w-5 h-5" /> Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// import React, { useState, useEffect, useContext } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { ShoppingCart, DollarSign, Package, User } from "lucide-react";
// import toast from "react-hot-toast";

// export default function ProductDetails() {
//   const { id } = useParams();
//   const { user } = useContext(AuthContext);
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await axios.get(`http://localhost:8000/api/products/${id}`);
//         setProduct(res.data);
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to load product");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;
//   if (!product)
//     return <p className="text-center mt-10 text-lg">Product not found</p>;

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
//         image: product.images?.[0] || null,
//         qty: 1,
//       });

//     localStorage.setItem("cart", JSON.stringify(cart));
//     toast.success(`${product.name} added to cart!`);
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
//       <div className="flex flex-col md:flex-row gap-6">
//         {/* Image section */}
//         <div className="md:w-1/2">
//           {product.images && product.images.length > 0 ? (
//             <Swiper
//               modules={[Navigation, Pagination]}
//               navigation
//               pagination={{ clickable: true }}
//               slidesPerView={1}
//             >
//               {product.images.map((img, idx) => (
//                 <SwiperSlide key={idx}>
//                   <img
//                     src={
//                       img.startsWith("http")
//                         ? img
//                         : `http://localhost:8000${img}`
//                     }
//                     alt={`${product.name}-${idx}`}
//                     className="w-full h-96 object-cover rounded"
//                   />
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           ) : (
//             <div className="w-full h-96 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
//               No Image
//             </div>
//           )}
//         </div>

//         {/* Info section */}
//         <div className="md:w-1/2 flex flex-col justify-between">
//           <div>
//             <p className="text-gray-600 flex items-center gap-1">
//               <DollarSign className="w-4 h-4" /> ${product.price}
//             </p>
//             <p className="text-gray-500 flex items-center gap-1">
//               <Package className="w-4 h-4" /> Qty: {product.quantity || 0}
//             </p>

//             {/* Farmer Info (bold black) */}
//             {user?.role === "customer" && (
//               <div className="mt-3 p-3 border rounded-md bg-gray-50">
//                 <p className="font-semibold text-black flex items-center gap-2">
//                   <User className="w-5 h-5" /> {farmerName}
//                 </p>
//                 <p className="text-black">{farmerEmail}</p>
//               </div>
//             )}

//             <p className="mt-4">{product.description}</p>
//           </div>

//           {/* Add to Cart */}
//           {user?.role === "customer" && (
//             <button
//               onClick={addToCart}
//               className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400 flex items-center gap-2"
//             >
//               <ShoppingCart className="w-4 h-4" /> Add to Cart
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
