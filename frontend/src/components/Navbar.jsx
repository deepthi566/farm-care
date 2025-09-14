import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully 👋");
    navigate("/login");
  };

  return (
    <nav className="bg-green-600 text-white px-6 py-3 shadow-lg flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link to="/" className="text-2xl font-bold">
          Farm Care
        </Link>

        {user?.role === "customer" && (
          <Link
            to="/products"
            className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
          >
            Browse Items
          </Link>
        )}

        {user?.role === "farmer" && (
          <>
            <Link
              to="/my-products"
              className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
            >
              My Products
            </Link>
            <Link
              to="/add-product"
              className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
            >
              Add Product
            </Link>
          </>
        )}
      </div>

      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
        >
          Home
        </Link>

        {!user ? (
          <>
            <Link
              to="/login"
              className="bg-blue-500 px-4 py-2 rounded-lg font-semibold hover:bg-blue-400"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            {user.role === "customer" && (
              <Link
                to="/cart"
                className="bg-yellow-400 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300"
              >
                Cart
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded-lg font-semibold hover:bg-red-400"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
