import express from "express";
import multer from "multer";
import path from "path";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("Only image files are allowed"), false);
};

const upload = multer({ storage, fileFilter });

// Routes
router.get("/", getProducts);
router.get("/:id", getProductById);

// Use upload.array for multiple images (max 5)
router.post("/create", protect, upload.array("images", 5), createProduct);
router.put("/update/:id", protect, upload.array("images", 5), updateProduct);

router.delete("/delete/:id", protect, deleteProduct);

export default router;
