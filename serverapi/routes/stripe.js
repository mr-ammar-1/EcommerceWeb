import express from "express";
const router = express.Router();




import { stripePayment, webhooks } from "../controllers/stripe";

router.post('/create-checkout-session',stripePayment);
router.post('/webhook', express.raw({type: 'application/json'}),webhooks)
module.exports = router;
