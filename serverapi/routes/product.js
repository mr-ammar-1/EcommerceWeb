import express from "express";
const router = express.Router();


import {getProducts, delProduct, getProduct,addProduct, editProduct,uploadImage,removeImage} from "../controllers/products"

router.get("/products",getProducts);
router.get("/product/:id", getProduct)
router.delete("/products/:id", delProduct);
router.post("/product/add",addProduct)
router.put("/product/:id", editProduct)
router.post("/product/upload-image",uploadImage);
router.post("/product/remove-image",removeImage);


module.exports = router;
