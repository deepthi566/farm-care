import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

export default function MyProducts() {
  const { user, token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/products");
        const mine = res.data.filter((p) => {
          const farmerId = p.farmer?._id || p.farmer;
          return farmerId === (user.id || user._id);
        });
        setProducts(mine);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [user]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/products/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Delete failed");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">My Products</h2>
        <Link
          to="/add-product"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Product
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.length ? (
          products.map((p) => (
            <ProductCard
              key={p._id}
              product={p}
              showActions={
                <div className="flex gap-2">
                  <Link
                    to={`/add-product?id=${p._id}`}
                    className="bg-yellow-400 px-3 py-1 rounded"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="bg-red-500 px-3 py-1 rounded text-white"
                  >
                    Delete
                  </button>
                </div>
              }
            />
          ))
        ) : (
          <p className="col-span-full text-gray-600">No products yet.</p>
        )}
      </div>
    </div>
  );
}
