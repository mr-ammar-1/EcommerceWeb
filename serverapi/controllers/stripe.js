import { Endpoint } from "aws-sdk";
import order from "../models/order";
import { Await } from "react-router-dom";

const express = require("express")

require('dotenv').config();

const stripe = require('stripe')('sk_test_51NXfaZKCb6TjeH5pkKnmcIX8CbwNlYWCQopwEGTdVn6VGV9rIsm3y2jqRgNZ7XJJZsx8dHbFOMsdmr9ZhVUmu2W0008KofiLpT');

const YOUR_DOMAIN = 'http://localhost:3000';



export const stripePayment =( async (req, res) => {
    

    const line_items=req.body.items.map((item)=>{
    return {
        price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
              
              metadata:{
                id:item.id
              }
            },
            unit_amount: item.price*100,
          },
          quantity: item.quantity,
    }
    })
    const customer = await stripe.customers.create({
        metadata:{
            userId:req.body.userId,
            cart:JSON.stringify(req.body.items),

        },
    })
    const session = await stripe.checkout.sessions.create({
        customer:customer.id,
      line_items,
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}/checkout-success`,
      cancel_url: `${YOUR_DOMAIN}/Cart`,
    });

    console.log(session)
    res.send({url:session.url});
  });

const createOrder= async (customer,data)=>{
   const Items=JSON.parse(customer.metadata.cart);
    const newOrder=new order({
        userId:customer.metadata.userId,
        customerId:data.customer,
        paymentIntentId:data.payment_intent,
        products:Items,
        subTotal:data.amount_subtotal,
        total:data.amount_total,
        shipping:data.customer_details,
        payment_status:data.payment_status,


    })
   try{
    const savedOrder = await newOrder.save();
    console.log("Processed Order :", savedOrder);
   }
   catch(err)
   {
    console.log(err)
   }
}

  let endpointSecret ;


  
  export const webhooks =(async (req, res) => {
  const sig = req.headers['stripe-signature'];

  
  let data;
  let eventType;
 

if(endpointSecret){
    let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    console.log("WebHooks Verified .....")
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  data=event.data.object
  eventType=event.type;
}
else{
  data=req.body.data.object
  eventType=req.body.type
}
  // Handle the event
  if(eventType==="checkout.session.completed"){
    stripe.customers.retrieve(data.customer).then((customer)=>{
        console.log(customer);
        console.log("data:",data);
        createOrder(customer,data)
    }).catch((err)=>{
        console.log(err.message)
    })
  
  }
 
  


  // Return a 200 response to acknowledge receipt of the event
  res.send().end();
});

