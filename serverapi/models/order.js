import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema({
  userId: {
    type: String,
    trim: true,
    required: true,
  },
  customerId:{
    type:String,
  },
  paymentIntentId:{
    type :String ,
  },

  products:[{
    id:{type:String},
    name:{type:String},
    price:{type:Number},
    quantity:{type:Number},
    description:{type:String}
  }],
  subTotal:{type:Number,required:true},
  total:{type:Number,required:true},
  shipping:{type:Object,required:true},
  delivery_status:{type:String,default:"Pending"},
  payment_status:{type:String,required:true},
},
  {timestamps:true}
 
);

export default mongoose.model("Order", orderSchema);
