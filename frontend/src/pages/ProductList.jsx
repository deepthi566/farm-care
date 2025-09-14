import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import toast from "react-hot-toast";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]); // 🔹 filtered list
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); // 🔹 search input

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/products");
        if (Array.isArray(res.data)) {
          setProducts(res.data);
          setFiltered(res.data); // initialize filtered list
        } else toast.error("No products found");
      } catch (err) {
        console.error(err);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // 🔹 filter products when search changes
  useEffect(() => {
    if (!search.trim()) {
      setFiltered(products);
    } else {
      const lower = search.toLowerCase();
      setFiltered(
        products.filter(
          (p) =>
            p.name.toLowerCase().includes(lower) ||
            p.description?.toLowerCase().includes(lower)
        )
      );
    }
  }, [search, products]);

  if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;
  if (products.length === 0)
    return <p className="text-center mt-10 text-lg">No products available.</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Browse Products</h2>

      {/* 🔹 Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full md:w-1/2 border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-center mt-10 text-gray-600">
          No matching products found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import ProductCard from "../components/ProductCard";
// import toast from "react-hot-toast";

// export default function ProductList() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get("http://localhost:8000/api/products");
//         if (Array.isArray(res.data)) setProducts(res.data);
//         else toast.error("No products found");
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to load products");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;
//   if (products.length === 0)
//     return <p className="text-center mt-10 text-lg">No products available.</p>;

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h2 className="text-3xl font-bold mb-6">Browse Products</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {products.map((p) => (
//           <ProductCard key={p._id} product={p} />
//         ))}
//       </div>
//     </div>
//   );
// }
