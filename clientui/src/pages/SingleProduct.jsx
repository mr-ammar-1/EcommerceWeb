import React, { useState, useEffect } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Single from "../Components/Single";

import axios from "axios";
import { user_images } from "../apicall/data";
// import User from "../apicall/products";

function SingleProduct() {
  // const [iuser, setiUsers] = useState(User);

  const [productsArray, setProductsArray] = useState([])
  const { id } = useParams();

  const getProduct = async() => {
      try{
          let {data} = await axios.get(`http://localhost:8000/product/${id}`)
          setProductsArray(data);
          
      } catch(err) {
          console.log("Error", err);
      }
  }

  useEffect(() => {
    getProduct()
}, [])


  const [foundItem, setFoundItem] = useState(null);
  const [loading, setLoading] = useState(false)

  // const findItemById = (id) => {
  //   const item = productsArray.find((item) => item.id == id);
  //   setFoundItem(item);
  // };



  return (
    <Container className="gap py-10">
        
          <Single
        name={productsArray?.name}
        category={productsArray?.category}
        rating={productsArray?.rating}
        description={productsArray?.description}
        price={productsArray?.price}
        picture={productsArray?.picture}
        slug={productsArray?.slug}

      />
    </Container>
  );
}

export default SingleProduct;
