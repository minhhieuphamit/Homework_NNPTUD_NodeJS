const Product = require('../schemas/product');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ isdelete: false }).sort({ order: 1 });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, price, order, categories } = req.body;
    const newProduct = new Product({ name, price, order, categories });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(productId, { isdelete: true }, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const deletedProduct = await Product.findByIdAndUpdate(productId, { isdelete: true }, { new: true });
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
}
