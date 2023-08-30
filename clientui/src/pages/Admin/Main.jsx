import React, { useContext, useEffect, useState } from 'react'
import Dashboard from './Dashboard'
import {FaCartArrowDown, FaUserAlt, FaSafari, FaTasks, FaCar,MdOutlineAddShoppingCart} from 'react-icons/fa'
import axios from 'axios'
import { Context } from "../../context";
import { StyledChart } from '../../Components/chart/index';
import ReactApexChart from "react-apexcharts";
import { AiOutlineAppstoreAdd } from "react-icons/ai";

import "./chart.css"



const Main = () => {

    const[barState,setBarState]=useState({series: [{
        name: 'Net Profit',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
      }, {
        name: 'Revenue',
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
      }, {
        name: 'Free Cash Flow',
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
      }],
      options: {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        },
        yaxis: {
          title: {
            text: '$ (thousands)'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "$ " + val + " thousands"
            }
          }
        }
      },
    
    
    })
   
    const [donutState,setDonutState]=useState({
        series: [44, 55, 41, 15],
        options: {
          chart: {
            type: 'donut',
          },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        },
      
      
      })


    const [state,setState]=useState( {
          
        series: [{
            name: "Desktops",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }],
        options: {
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight'
          },
          title: {
            text: 'Product Trends by Month',
            align: 'left'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
          }
        },
      
      
      }
      
    
      
   

  
    )

   


    const [usersArray, setUsersArray] = useState([])
    const [productsArray, setProductsArray] = useState([])
    const [orders, setOrders] = useState([])
    
    const getOrders = async () => {
      try {
        let { data } = await axios.get("http://localhost:8000/orders");
  
        setOrders(data);
      } catch (err) {
        console.log("Error", err);
      }
    };
    const getUsers = async() => {
        try{
            let {data} = await axios.get("http://localhost:8000/users")
            setUsersArray(data);
            
        } catch(err) {
            console.log("Error", err);
        }
    }
    const getProducts = async() => {
        try{
            let {data} = await axios.get("http://localhost:8000/products")
            setProductsArray(data);
            
        } catch(err) {
            console.log("Error", err);
        }
    }

    useEffect(() => {
        getUsers()
        getProducts()
        getOrders()
    }, [])

  return (
    <div>
      <Dashboard/>
        <div className='content container mt-3 '>
            <div className='row'>
                <div className='col-md-2.5 text-white col bg-success d-flex 
                    justify-content-around px-1 py-3 rounded mr-1'>
                    <p>Total Orders : <strong>{orders?.length}</strong></p>
                    <FaCartArrowDown />
                </div>
                <div className='col-md-3 text-white col bg-danger d-flex 
                    justify-content-around px-1 py-3 rounded mr-1'>
                    <p>Total Users : <strong>{usersArray?.length}</strong></p>
                    <FaUserAlt />
                </div>
                <div className='col-md-3 text-white col bg-warning d-flex 
                    justify-content-around px-1 py-3 rounded mr-1'>
                    <p>Total Products : <strong>{productsArray?.length}</strong></p>
                    <AiOutlineAppstoreAdd />
                </div>
                <div className='col-md-3 text-white col bg-primary d-flex 
                    justify-content-around px-1 py-3 rounded mr-1'>
                    <p>Report</p>
                    <FaTasks />
                </div>
            </div>
            

            {/* <div className="d-flex justify-content-between mt-3">
                <h2>Products</h2>
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
                        <td>Iphone</td>
                        <td>14 Pro</td>
                        <td>Four R</td>
                        <td><button class="btn btn-success mx-2">U</button>
                        <button class="btn btn-danger">D</button> </td>
                    </tr>
                    <tr>
                        <td>1,001</td>
                        <td>Iphone</td>
                        <td>14 Pro</td>
                        <td>Four R</td>
                        <td><button class="btn btn-success mx-2">U</button>
                        <button class="btn btn-danger">D</button> </td>
                    </tr>
                    <tr>
                        <td>1,001</td>
                        <td>Iphone</td>
                        <td>14 Pro</td>
                        <td>Four R</td>
                        <td><button class="btn btn-success mx-2">U</button>
                        <button class="btn btn-danger">D</button> </td>
                    </tr>
                    <tr>
                        <td>1,001</td>
                        <td>Iphone</td>
                        <td>14 Pro</td>
                        <td>Four R</td>
                        <td><button class="btn btn-success mx-2">U</button>
                        <button class="btn btn-danger">D</button> </td>
                    </tr>
                    <tr>
                        <td>1,001</td>
                        <td>Iphone</td>
                        <td>14 Pro</td>
                        <td>Four R</td>
                        <td><button class="btn btn-success mx-2">U</button>
                        <button class="btn btn-danger">D</button> </td>
                    </tr>
                    <tr>
                        <td>1,001</td>
                        <td>Iphone</td>
                        <td>14 Pro</td>
                        <td>Four R</td>
                        <td><button class="btn btn-success mx-2">U</button>
                        <button class="btn btn-danger">D</button> </td>
                    </tr>
                    <tr>
                        <td>1,001</td>
                        <td>Iphone</td>
                        <td>14 Pro</td>
                        <td>Four R</td>
                        <td><button class="btn btn-success mx-2">U</button>
                        <button class="btn btn-danger">D</button> </td>
                    </tr>
                </tbody>
            </table> */}

     {/* <StyledChart /> */}
     <br/>
     <br/>
     <br/>
     <div className='mychart'>
    
  <ReactApexChart options={state.options} series={state.series} type="line" height={350} width={570} />

  <ReactApexChart options={donutState.options} series={donutState.series} type="donut"  height={350} width={560} />



  </div>
  <br/>
     <br/>
     <br/>
  <ReactApexChart options={barState.options} series={barState.series} type="bar" height={450} />

  </div>
    
        </div>
       
)
}

export default Main
