import Product from '../models/productmodels.js';
import HandleError from '../helper/handleError.js';

// create products route
export const addProduct = async (req, res, next) => {
  // consloe.log(req.body);
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, message: 'Product created successfully', product });
  } catch (error) {
    // res.status(400).json({ success: false, message: 'Error creating product', error });
    next(error);  // Pass the error to the error handling middleware instead of sending a response directly
  }
};

// update product route controller
export const updateProduct = async (req, res, next) => {
  const productId = req.params.id;

  try {

    if (!productId) {
      return next(
        new HandleError("Product ID is required", 400)
      );
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return next(
        new HandleError(
          "Please provide data to update",
          400
        )
      );
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedProduct) {
      return next( new HandleError("Product not found", 404)); }
        
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct
    });

  } catch (error) {
    next(error);
  }
};

// Delete product route controller
export const deleteProduct = async (req,res,next) => {
  const productId = req.params.id;
  try{
    if (!productId) {
      // return res.status(400).json( {success: false, message: "Product ID is required"})
      return next(new HandleError("Product ID is required", 404));
    }

    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
       return next(new HandleError("Product not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      product: deletedProduct
    });
  }
  catch (error) {
    next(error);
  }

};


// get all products route
export const getAllProducts = async(req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, message: 'Products fetched successfully', products });
    } catch (error) {
        // res.status(500).json({ success: false, message: 'Error fetching products', error });
        next(error);  // Pass the error to the error handling middleware instead of sending a response directly
    }
};


// single product route controller
export const getSingleProduct = async(req, res , next) => {
  // const productId = req.params.id;
  // console.log(`Fetching product with ID: ${productId}`);
  const id = req.params.id;
   try {
    if (!id) {
      return next(new HandleError("Product ID is required", 400));
    }
    const product = await Product.findById(id);
    res.status(200).json({ success: true, message: 'Product fetched successfully', product });
   } catch (error) {
    next(error);
   }      
};

