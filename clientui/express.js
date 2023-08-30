const express = require('express');
const collections = require('./mongo');
const cors = require('cors');
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors());

app.get('/',(req,res)=>{

}
)

app.post('/',async (req,res)=>{
   const{email,password}=req.body

   try{
    const check= await collections.findOne({email:email})
    
    if(check){
        res.json("Exist")
    } 
    else{
        res.json("NotExist")
    }

}
   catch(e){
        res.json("Error: " + e.message )

   }
}
)

app.post('/SignUp',async (req,res)=>{
    const{email,password, name}=req.body

    const data = {
        name,
        email,
        password
    }
 
    try{
     const check= await collections.findOne({email:email})
     if(check){
         res.json("Exist")
     } 
     else{
         res.json("NotExist")
         await collections.insertMany([data])
     }
 
 }
    catch(e){
         res.json("Error: " + e.message )
         
    }
 }
 )
 
app.listen(8000,()=>{
    console.log("Server is running")
})


