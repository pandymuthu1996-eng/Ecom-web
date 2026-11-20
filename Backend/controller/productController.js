// all products route
export const getAllProducts = (req, res) => {
  res.status(200).json({ message: 'All products retrieved successfully' });
}


// single product route
export const getSingleProduct = (req, res) => {
  // const productId = req.params.id;
  res.status(200).json({ message: `Product with ID product 1 successfully` });
};

