const Category = require("../schemas/category");
const Product = require("../schemas/product");

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isdelete: false }).sort({
      order: 1,
    });
    const categoriesWithProducts = await Promise.all(
      categories.map(async (category) => {
        const products = await Product.find({
          categories: category._id,
          isdelete: false,
        });
        return {
          category: category,
          products: products,
        };
      })
    );
    res.json(categoriesWithProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const createCategory = async (req, res) => {
  try {
    const { name, order } = req.body;

    if (!name || !order) {
      return res
        .status(400)
        .json({ error: "Name and order are required fields" });
    }

    const newCategory = new Category({ name, order, isdelete: false });

    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllCategories,
  createCategory,
};
