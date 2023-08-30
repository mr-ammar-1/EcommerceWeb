import 'antd/dist/reset.css';
import Header from './Components/Header';
import TopHeader from './Components/TopHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cards from './Components/Cards';
import Slider from './Components/Slider'
import MyFooter from './Components/MyFooter';
import {BrowserRouter as Router,Routes,Route, useParams, useLocation} from 'react-router-dom'

import Home from './Components/Home';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import '../src/Css/custom.css'

import CustomerSupport from './Components/CustomerSupport';
import AboutUs from './Components/AboutUs';
import Cart from "./Components/Cart";
import Userspage from "./pages/Productspage";
import SingleProduct from "./pages/SingleProduct";
import { CartProvider } from "react-use-cart";
import Resgister from './Components/Resgister';
import { useState } from 'react';
import AllProducts from './Components/AllProducts';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "./context";
import ForgotPassword from "./Components/Forgotpassword"
import Dashboard from './pages/Admin/Dashboard';
import ManageProducts from './pages/Admin/ManageProducts';
import Main from './pages/Admin/Main';
import ManageUsers from './pages/Admin/ManageUsers';
import Orders from './pages/Admin/Orders';
import DailySales from './pages/Admin/DailySales';
import CheckoutSuccess from './Components/CheckoutSuccess';


function App() {
  const {pathname} = useLocation()
  const [search,setSearch]=useState("");
  const [filter,setfilter]=useState("");
  
  return (
    <div >
      <Provider>
      <ToastContainer position="bottom-center" />
     <CartProvider>
     {
       pathname === "/" || pathname === "/signup" || pathname === "/forgot-password"  ? "" : <div>
       <TopHeader setSearch={setSearch} />
     
       </div> 
     }
     {

      pathname === "/" || pathname === "/signup" || pathname === "/forgot-password" || pathname === "/admin/Dashboard" || pathname === "/admin/ManageProducts" || pathname === "/admin/ManageUsers" || pathname === "/admin/Orders" || pathname === "/admin/DailySales"  ? "" : <div>
      
      <Header/>
      </div> 

     }
     <Routes>
       
      <Route path='/' element={<Login/>} />
      
      <Route path='/forgot-password' element={<ForgotPassword/>} />
      <Route path='/user/Home' element={<Home search={search} />} />
      
      <Route path="/user/product/:id" element={<SingleProduct  /> } />
     
      
      <Route path='/user/AllProducts' element={<AllProducts search={search} setfilter={setfilter} filter={filter} />} />
     
      <Route path='/user/CustomerSupport' element={<CustomerSupport/>} />
      <Route path='/user/AboutUs' element={<AboutUs/>} />
     
      <Route path="/admin/Dashboard" element={<Main/> } />
      <Route path="/admin/ManageProducts" element={<ManageProducts /> } />
      <Route path="/admin/ManageUsers" element={<ManageUsers /> } />
      <Route path="/admin/Orders" element={<Orders /> } />
      <Route path="/admin/DailySales" element={<DailySales /> } />
      <Route path="/checkout-success" element={<CheckoutSuccess /> } />
      
      
      
      <Route path='/Cart' element={<Cart/>} />
      
         <Route path='/signup' element={<Resgister/>} />
       
    
       <Route path='*' element={<h1>404 Not Found</h1>} />
    </Routes>
    </CartProvider>
    
     
     {
        pathname === "/" || pathname === "/signup" || pathname === "/forgot-password" ? "" : <MyFooter/>

     } 
     
   

     </Provider>

    </div>
  );
}

export default App;
