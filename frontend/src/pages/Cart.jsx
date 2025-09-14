import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, []);

  const changeQty = (id, delta) => {
    const updated = cart.map((item) =>
      item._id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const remove = (id) => {
    const updated = cart.filter((item) => item._id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cart.reduce((s, i) => s + i.qty * i.price, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return toast.error("Your cart is empty!");

    // In real apps you'd call backend API here
    toast.success("Checkout successful! 🎉");

    // Clear cart
    localStorage.removeItem("cart");
    setCart([]);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-600">
          Your cart is empty.{" "}
          <Link to="/products" className="text-green-500">
            Browse products
          </Link>
        </p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 bg-white p-4 rounded shadow"
              >
                <img
                  src={
                    item.image
                      ? `http://localhost:8000/uploads/${item.image}`
                      : "https://via.placeholder.com/120"
                  }
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">${item.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => changeQty(item._id, -1)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span>{item.qty}</span>
                  <button
                    onClick={() => changeQty(item._id, 1)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>
                <div>
                  <p className="font-semibold">
                    ${(item.qty * item.price).toFixed(2)}
                  </p>
                  <button
                    onClick={() => remove(item._id)}
                    className="text-red-500 text-sm mt-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end items-center gap-6">
            <p className="text-xl font-semibold">Total: ${total.toFixed(2)}</p>
            <button
              onClick={handleCheckout}
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-400"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
