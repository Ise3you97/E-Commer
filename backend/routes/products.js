const express = require("express");
const router = express.Router();
const {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductsByTag,
} = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/tag/:tag", getProductsByTag); // Obtener productos por etiqueta
router.get("/", getProducts); // Obtener todos los productos
router.get("/:id", getProduct); // Obtener un producto por ID
router.post("/", authMiddleware, createProduct); // Crear un nuevo producto
router.put("/:id", authMiddleware, updateProduct); // Actualizar un producto por ID
router.delete('/:id', authMiddleware, deleteProduct);

module.exports = router;
