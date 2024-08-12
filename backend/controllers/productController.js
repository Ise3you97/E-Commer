const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  const { name, image, price, description,tag } = req.body;
  try {
    const product = new Product({ name, image, price, description, tag });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { name, image, price, description, tag } = req.body;

  try {
    // Busca el producto por ID y actualiza los campos con los datos del body
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, image, price, description, tag },
      { new: true, runValidators: true } // Devuelve el documento actualizado y valida los datos
    );

    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

    res.status(200).json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductsByTag = async (req, res) => {
  try {
    const products = await Product.find({ tag: req.params.tag });
    if (products.length === 0) return res.status(404).json({ message: 'No se encontraron productos con esta etiqueta' });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
