import Product from "../model/Product.js";

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("farmer", "name email");
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get single product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "farmer",
      "name email"
    );
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Create product (farmer)
// Create product (farmer)
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;

    // Save multiple images if uploaded
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => `/uploads/${file.filename}`);
    } else if (req.body.images) {
      // fallback if images sent as URLs from frontend
      images = Array.isArray(req.body.images)
        ? req.body.images
        : [req.body.images];
    }

    const newProduct = new Product({
      name,
      description,
      price,
      quantity,
      images, // store array of images
      farmer: req.user._id,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });

    if (product.farmer.toString() !== req.user._id.toString())
      return res.status(403).json({ msg: "Not authorized" });

    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (quantity !== undefined) product.quantity = quantity;

    // Handle multiple images
    if (req.files && req.files.length > 0) {
      product.images = req.files.map((file) => `/uploads/${file.filename}`);
    } else if (req.body.images) {
      product.images = Array.isArray(req.body.images)
        ? req.body.images
        : [req.body.images];
    }

    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });

    if (product.farmer.toString() !== req.user._id.toString())
      return res.status(403).json({ msg: "Not authorized" });

    await product.deleteOne();
    res.json({ msg: "Product removed" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
