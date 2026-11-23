import express from "express";
// import {getAllProducts, getSingleProduct} from "../controller";
import { getAllProducts, getSingleProduct, addProduct , updateProduct ,deleteProduct } from "../controller/productController.js";

const router = express.Router();

router.route('/products').get(getAllProducts).post(addProduct);

// router.get('/product/:id', getSingleProduct); //    Eg for single product route

router.route('/product/:id').get(getSingleProduct).put(updateProduct).delete(deleteProduct);

export default router;