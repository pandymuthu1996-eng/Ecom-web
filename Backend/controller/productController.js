import Product from '../models/productmodels.js';

// create products route
export const addProduct = async (req, res) => {
  // consloe.log(req.body);
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, message: 'Product created successfully', product });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error creating product', error });
  }
};


// get all products route
export const getAllProducts = async(req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, message: 'Products fetched successfully', products });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching products', error });
    }
};


// single product route controller
export const getSingleProduct = async(req, res) => {
  // const productId = req.params.id;
  // console.log(`Fetching product with ID: ${productId}`);
   try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({ success: true, message: 'Product fetched successfully', product });
   } catch (error) {
    res.status(404).json({ success: false, message: 'Product not found', error });
   }      
};

