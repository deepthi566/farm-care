import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    images: [
      {
        type: String,
        default: "https://i.ibb.co/DpZ3qy2/Untitled-design-10.png",
      },
    ], // array of image URLs or paths
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
