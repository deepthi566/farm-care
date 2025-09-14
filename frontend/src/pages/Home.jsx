import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="bg-green-500 text-white p-20 text-center">
        <h1 className="text-5xl font-bold mb-4">Farm to Doorstep</h1>
        <p className="text-xl mb-6">
          Fresh fruits, vegetables & organic products delivered straight from
          the farm.
        </p>
        <Link
          to="/products"
          className="bg-yellow-400 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300"
        >
          Browse Products
        </Link>
      </div>

      <div className="p-10 max-w-7xl mx-auto text-center">
        <h2 className="text-2xl font-semibold">Welcome to Farm Care</h2>
        <p className="text-gray-600 mt-2">
          Create your account as a Customer or Farmer and start exploring.
        </p>
      </div>
    </div>
  );
}
