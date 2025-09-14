import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  return (
    <div className="p-10 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Welcome, {user?.name}</h2>
      <div className="flex gap-4">
        <Link
          to="/my-products"
          className="bg-white text-green-600 px-4 py-2 rounded"
        >
          Browse My Products
        </Link>
        <Link
          to="/add-product"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Product
        </Link>
      </div>
    </div>
  );
}
