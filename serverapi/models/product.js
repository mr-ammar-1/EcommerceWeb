import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const productSchema = new Schema({
  id: {
    type: Number,
    trim: true,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  rating: {
    type: Number,
    trim: true,
    min: 1,
    max: 5,
  },
  slug:{
    type: String,
    lowercase: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  price: {
    type: Number,
    trim: true,
    required: true,
  },
  picture: {
    type: String,
    default: "/avatar-no-photo.png",
  },
  category: {
    type: String,
    trim: true,
    required: true,
  },
  quantity: {
    type: Number,
    trim: true,
    required: true,
  },
});

export default mongoose.model("Product", productSchema);
