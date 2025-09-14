import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddProduct() {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const productId = new URLSearchParams(location.search).get("id");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || user.role !== "farmer") navigate("/login");

    if (productId) {
      (async () => {
        try {
          const res = await axios.get(
            `http://localhost:8000/api/products/${productId}`
          );
          const p = res.data;
          setName(p.name);
          setDescription(p.description);
          setPrice(p.price);
          setQuantity(p.quantity);
          if (p.images && p.images.length > 0) {
            setImagePreviews(
              p.images.map((img) => `http://localhost:8000${img}`)
            );
          }
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [user, navigate, productId]);

  const onFiles = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
    setImagePreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !price || !quantity) {
      setError("Please fill required fields");
      return;
    }

    try {
      const form = new FormData();
      form.append("name", name);
      form.append("description", description);
      form.append("price", price);
      form.append("quantity", quantity);
      imageFiles.forEach((f) => form.append("images", f));

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      if (productId) {
        await axios.put(
          `http://localhost:8000/api/products/update/${productId}`,
          form,
          config
        );
      } else {
        await axios.post(
          "http://localhost:8000/api/products/create",
          form,
          config
        );
      }

      navigate("/my-products");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Save failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-green-600">
          {productId ? "Edit Product" : "Add Product"}
        </h2>
        {error && <p className="text-red-500 mb-3">{error}</p>}

        <form onSubmit={submit} className="space-y-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product Name"
            className="w-full border px-4 py-2 rounded"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Description"
            className="w-full border px-4 py-2 rounded"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="w-full border px-4 py-2 rounded"
              required
            />
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Quantity"
              className="w-full border px-4 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Product Images</label>
            <input type="file" accept="image/*" multiple onChange={onFiles} />
            {imagePreviews.length > 0 && (
              <div className="mt-4 flex gap-2 flex-wrap">
                {imagePreviews.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Preview ${i + 1}`}
                    className="w-20 h-20 object-cover rounded border"
                  />
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-400"
          >
            {productId ? "Update Product" : "Save Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
