import React, { useEffect, useState } from "react";
import Productspage from "../pages/Productspage";
import Filters from "./Filters";
import Divider from "./Divider";
import products from "../apicall/products";
import axios from "axios";

const AllProducts = ({ search, setfilter, filter }) => {
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
    <div className="flex gap-5">
      <Filters setfilter={setfilter} />
      <div className="flex flex-col gap-5 w-full">
        <div className="flex gap-5 items-center"></div>
        <div>
          <div className="border border-red-400 rounded border-solid flex flex-col gap-1 pb-2 cursor-pointer">
            <Productspage
              searchProduct={search}
              isSort={false}
              iuser={productsArray}
              searchFilter={filter}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
