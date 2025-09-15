import Product from "../models/product.model.js";
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      imageUrl,
      category
    } = req.body;
    if (!name || !description || !price || !imageUrl || !category) {
      return res.status(400).json({
        message: "Please provide all required fields."
      });
    }
    const newProduct = new Product({
      name,
      description,
      price,
      imageUrl,
      category,
      status: "available"
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.log("Error in createProduct controller: ", error.message);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
};
export const getAllProducts = async (req, res) => {
  try {
    const {
      category,
      sort,
      page = 1,
      limit = 6
    } = req.query;
    const filter = {};
    if (category) {
      filter.category = category;
    }
    const sortOptions = {};
    if (sort === "createdAt") {
      sortOptions.createdAt = -1;
    }
    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limit);
    const products = await Product.find(filter).sort(sortOptions).limit(parseInt(limit)).skip((page - 1) * parseInt(limit));
    res.status(200).json({
      products,
      page: parseInt(page),
      totalPages
    });
  } catch (error) {
    console.log("Error in getAllProducts controller: ", error.message);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
};
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }
    res.status(200).json(product);
  } catch (error) {
    console.log("Error in getProductById controller: ", error.message);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
};