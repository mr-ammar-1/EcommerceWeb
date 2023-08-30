import express from 'express';
const router = express.Router();






import { getOrders,delOrder, getOrder, editOrder } from "../controllers/order";

router.get("/orders",getOrders)
router.delete("/order/:id",delOrder)
router.get("/order/:id", getOrder)
router.put("/order/:id", editOrder)




module.exports = router;

