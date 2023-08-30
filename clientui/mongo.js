const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Ammar:12345@cluster0.cpsplqp.mongodb.net/Ecommerce')



.then(
    ()=>{console.log('MongoDb Connected')
})

.catch(()=>{
console.log('MongoDb Connection Failed')
})

const newSchema=new mongoose.Schema({

   name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }



})

const collection=mongoose.model("collection",newSchema) 

module.exports=collection

