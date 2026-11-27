import express from "express";
// import {getAllProducts, getSingleProduct} from "../controller";
import { getAllProducts, getSingleProduct, addProduct , updateProduct ,deleteProduct } from "../controller/productController.js";
import { verifyUser , authorizeRoles } from "../helper/userAuth.js";


const router = express.Router();

router.route('/products')
  .get(verifyUser, getAllProducts)
  .post(verifyUser, authorizeRoles("admin"), addProduct);

// router.get('/product/:id', getSingleProduct); //    Eg for single product route

router.route('/product/:id').get(getSingleProduct).put(verifyUser,updateProduct).delete(verifyUser, authorizeRoles("admin"), deleteProduct);

export default router;