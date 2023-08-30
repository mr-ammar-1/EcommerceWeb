import Product from "../models/product"
import AWS from 'aws-sdk';
import { nanoid } from "nanoid";
import slugify from "slugify";

const awsConfig = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    apiVersion: process.env.AWS_API_VERSION,
};

const S3 = new AWS.S3(awsConfig);

export const uploadImage = async (req, res) => {
    //console.log(req.body);
    try{
        const { image } = req.body;
        if (!image) return  res.status(400).send("No Image");

        // prepare the image
        const base64Data = new Buffer.from(
            image.replace(/^data:image\/\w+;base64,/,""),
            "base64"
        );

        const type = image.split(";")[0].split("/")[1];

        // image params
        const params = {
                Bucket: "educators-lms-bucket",
                Key: `${nanoid()}.${type}`,
                Body: base64Data,
                ACL: 'public-read',
                ContentEncoding: 'base64',
                ContentType: `image/${type}`,
        }
        // upload to s3
        S3.upload(params, (err, data) => {
            if(err){
                console.log(err);
                return res.sendStatus(400);
            } 
            console.log(data);
            res.send(data);
        });
    } catch(err){
        console.log(err);
    }
}

export const removeImage = async (req, res) => {
      try {
          const { image } = req.body;
          // image params
          const params = {
             Bucket: image.Bucket,
             Key: image.Key,
          }
          // send remove request to s3
          S3.deleteObject(params, (err, data) => {
             if(err) {
               console.log(err)
               res.sendStatus(400)     
             }
             res.send({ok: true});
          });
      } catch (err) {
            console.log(err);
      }
};





export const getProducts = async (req, res) => {
    // console.log("Hello");
    try {
        const products = await Product.find()
        return res.json(products)
    } catch (error) {
        
    }
}

export const getProduct = async (req, res) => {
    try {
        // console.log(req.params.id);
        const product = await Product.findOne({slug: req.params.id})
        return res.json(product)
    } catch (error) {
        
    }
}

export const editProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate({id: req.params.id}, req.body)
        return res.json(product)
    } catch (error) {
        
    }
}

export const addProduct = async (req, res) => {
    try {
        //console.log(req.body);
        const { name, id, price,quantity,category,rating,description,picture } =  req.body;
        const productExist = await Product.findOne({
            slug: slugify(req.body.name.toLowerCase()),
        });
        if(productExist) return res.status(400).send("Product Name is already taken");
       
        if (!name) return res.status(400).send("Name is required");
        
     
      

        /* add new product */
        const product = new Product({
                id,
                name,
                price,
                quantity,
                category,
                rating,
                description,
                picture,
                slug: slugify(req.body.name),
                
        });
        await product.save();
        
        //console.log("New user created:", user);
        return res.json(product);
    }
    catch (err){
        console.log(err);
        return res.status(400).send("Error: try again");
    }   
}

export const delProduct = async (req, res) => {
    // console.log("Hello");
    // console.log(req.params.id);
    try {
        const products = await Product.findOneAndDelete({_id: req.params.id})
       return res.json(products)

    } catch (error) {
        
    }
}