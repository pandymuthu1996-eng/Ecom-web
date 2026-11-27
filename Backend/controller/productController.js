import Product from '../models/productmodels.js';
import HandleError from '../helper/handleError.js';
import ApiHelper from '../helper/apiHelper.js';

// create products route
export const addProduct = async (req, res, next) => {
  // consloe.log(req.body);

  try {
    console.log("REQ.USER", req.user);
console.log("REQ.BODY", req.body);
    req.body.user = req.user.id; // Assign the user ID from the authenticated user to know which user created the product
    const product = await Product.create(req.body)
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
export const getAllProducts = async(req, res, next) => {
  console.log(req.query);
    try {
      
        const resultPerPage = parseInt(req.query.limit) || 4; // Number of products to display per page
        const apiHelper = new ApiHelper(Product.find(), req.query).search().filter();
        const filteredQuery = apiHelper.query.clone(); // Clone the query to get the filtered results
        const productsCount = await filteredQuery.countDocuments(); // Count the total number of products after filtering
        
        const totalPages = Math.ceil(productsCount / resultPerPage);
        const currentPage = parseInt(req.query.page) || 1;

        if(totalPages > 0 && currentPage > totalPages) {
            return next(new HandleError(`Page ${currentPage} does not exist. Total pages: ${totalPages}`, 404));
        }
        apiHelper.pagination(resultPerPage);

        const products = await apiHelper.query;
        res.status(200).json({
           success: true, 
           message: 'Products fetched successfully', 
           products,
           productsCount,
           resultPerPage,
           totalPages,
            currentPage
        });
    } catch (error) {
       
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

