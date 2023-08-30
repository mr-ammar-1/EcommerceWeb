import React, { useState } from 'react'
import "./Home.css"
import {FaCartArrowDown, FaUserAlt, FaSafari, FaTasks, FaCar,MdOutlineAddShoppingCart} from 'react-icons/fa'
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
function Dashboard({status}) {
    const [dash,setDashboard]=useState("");
    
    
    const {pathname} = useLocation();
  return (
    <div className='d-flex home'>
        <div className='d-flex sidebar flex-column flex-shrink-0  bg-dark'>
            <ul className='nav nav-pills flex-column mb-auto px-0 mt-3'> 
                <li className='nav-item '> 
           
                <Link to="/admin/Dashboard" style={{textDecoration: 'none'}}> 
                    <a href="" className={`nav-link text-white ${pathname === "/admin/Dashboard" && "active"}`}>
                        <FaSafari/> <span className='ms-2'>Dashboard</span>
                        
                    </a>
                  </Link>
                </li>
                <li className='nav-item '>   
              
                <Link to="/admin/ManageProducts" style={{textDecoration: 'none'}}>  
                    <a href="" className={`nav-link text-white ${pathname === "/admin/ManageProducts" && "active"}`}>
                        <AiOutlineAppstoreAdd/> <span className='ms-2'>Manage Products</span>
                    
                    </a>
                    </Link>
                </li>
                <li className='nav-item '>    
                <Link to="/admin/Orders" style={{textDecoration: 'none'}}>              
                    <a href="" className={`nav-link text-white ${pathname === "/admin/Orders" && "active"}`}>
                        <FaCartArrowDown/> <span className='ms-2'>Orders</span>
                    </a>
                    </Link>  
                </li>
                <li className='nav-item '>     
                <Link to="/admin/ManageUsers" style={{textDecoration: 'none'}}>       
                    <a href="" className={`nav-link text-white ${pathname === "/admin/ManageUsers" && "active"}`}>
                        <FaUserAlt/> <span className='ms-2'>Manage Users</span>
                    </a>
                    </Link>        
                </li>
                <li className='nav-item '>  
                <Link to="/admin/DailySales" style={{textDecoration: 'none'}}>                 
                    <a href="" className={`nav-link text-white ${pathname === "/admin/DailySales" && "active"}`}>
                        <FaTasks/> <span className='ms-2'>Daily Reports</span>
                    </a>
                    </Link> 
                </li>
            </ul>

        </div>
        {/* <div className='content container mt-3'>
            <div className='row'>
                <div className='col-md-3 text-white col bg-success d-flex 
                    justify-content-around px-1 py-3 rounded'>
                    <p>Total Orders</p>
                    <FaCartArrowDown />
                </div>
                <div className='col-md-3 text-white col bg-danger d-flex 
                    justify-content-around px-1 py-3 rounded'>
                    <p>Total Users</p>
                    <FaCartArrowDown />
                </div>
                <div className='col-md-3 text-white col bg-warning d-flex 
                    justify-content-around px-1 py-3 rounded'>
                    <p>Total Sales</p>
                    <FaCartArrowDown />
                </div>
                <div className='col-md-3 text-white col bg-primary d-flex 
                    justify-content-around px-1 py-3 rounded'>
                    <p>Report</p>
                    <FaCartArrowDown />
                </div>
            </div>

            <div className="d-flex justify-content-between mt-3">
                <h2>Cars</h2>
                <button className="btn btn-success">+Add</button>
            </div>
            <table class="table w-100">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Title</th>
                        <th scope="col">Title</th>
                        <th scope="col">Title</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1,001</td>
                        <td>Toyota</td>
                        <td>Corolla</td>
                        <td>Four R</td>
                        <td><button class="btn btn-success mx-2">U</button>
                        <button class="btn btn-danger">D</button> </td>
                    </tr>
                    <tr>
                        <td>1,001</td>
                        <td>Toyota</td>
                        <td>Corolla</td>
                        <td>Four R</td>
                        <td><button class="btn btn-success mx-2">U</button>
                        <button class="btn btn-danger">D</button> </td>
                    </tr>
                    <tr>
                        <td>1,001</td>
                        <td>Toyota</td>
                        <td>Corolla</td>
                        <td>Four R</td>
                        <td><button class="btn btn-success mx-2">U</button>
                        <button class="btn btn-danger">D</button> </td>
                    </tr>
                    <tr>
                        <td>1,001</td>
                        <td>Toyota</td>
                        <td>Corolla</td>
                        <td>Four R</td>
                        <td><button class="btn btn-success mx-2">U</button>
                        <button class="btn btn-danger">D</button> </td>
                    </tr>
                    <tr>
                        <td>1,001</td>
                        <td>Toyota</td>
                        <td>Corolla</td>
                        <td>Four R</td>
                        <td><button class="btn btn-success mx-2">U</button>
                        <button class="btn btn-danger">D</button> </td>
                    </tr>
                    <tr>
                        <td>1,001</td>
                        <td>Toyota</td>
                        <td>Corolla</td>
                        <td>Four R</td>
                        <td><button class="btn btn-success mx-2">U</button>
                        <button class="btn btn-danger">D</button> </td>
                    </tr>
                    <tr>
                        <td>1,001</td>
                        <td>Toyota</td>
                        <td>Corolla</td>
                        <td>Four R</td>
                        <td><button class="btn btn-success mx-2">U</button>
                        <button class="btn btn-danger">D</button> </td>
                    </tr>
                </tbody>
            </table>

        </div> */}
    </div>
  )
}

export default Dashboard