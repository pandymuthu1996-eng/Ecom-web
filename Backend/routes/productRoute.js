import express from "express";
// import {getAllProducts, getSingleProduct} from "../controller";
import { getAllProducts, getSingleProduct, addProduct } from "../controller/productController.js";

const router = express.Router();

router.route('/products').get(getAllProducts).post(addProduct);

router.get('/product/:id', getSingleProduct);

export default router;