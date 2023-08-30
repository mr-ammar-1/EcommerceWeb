import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import Slider from "./Slider";
import { useLocation,useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutUs from "./AboutUs";
import CustomerSupport from "./CustomerSupport";
import Products from "../apicall/products";
import Header from "./Header";
import Productspage from "../pages/Productspage";
import axios from "axios";
import {Button} from 'react-bootstrap'
import MainImg from './MainImg.jpg'
import "./style.css"
import UserRoute from "./routes/UserRoute";



function Home({ search }) {
  const location = useLocation();
  const id = location.state?.id;
  const navigate = useNavigate();

  const [productsArray, setProductsArray] = useState([])

  const getProducts = async() => {
      try{
          let {data} = await axios.get("http://localhost:8000/products")
          setProductsArray(data);
          
      } catch(err) {
          console.log("Error", err);
      }
  }

 

  useEffect(() => {
    getProducts()
}, [])
  return (
 
    <div>
      <div className='bg'> 
    <section>
     
    <div className='banner-card'>
    <img
          className="d-block w-100"
          src={MainImg}
         
          height={590} width={1519}
        />
        <div className='banner-text'>
            <h4>Men's Style and Fashion</h4>
            <p>Save Upto 40%</p>
            <Button variant='secondary' size='lg' onClick={()=>navigate("/user/AllProducts")} >Shop now</Button>
       
        </div>
        </div>
        
    </section>
    <br/>

        </div>
      {search.length > 0 ? "" : <Slider />}
      <Productspage
        searchProduct={search}
        isSort={true}
        iuser={productsArray}
        searchFilter={""}
      />
      {/* <Cards/> */}
    </div>

  );
}

export default Home;
