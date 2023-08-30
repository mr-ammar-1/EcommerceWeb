import React, { useEffect, useState } from 'react'
import Dashboard from './Dashboard'
import Modal from "react-bootstrap/Modal";
import Divider from "../../Components/Divider";
import { Form, Input, Button, message } from "antd";
import axios from 'axios';
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Combobox from "react-widgets/Combobox";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { Select,  Avatar, Badge } from "antd";
import { SaveOutlined } from "@ant-design/icons";

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [show, setShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false)
  const [editOrder ,seteditOrder] = useState({})
  const handleShow = () => setShow(true);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const options = ["Pending", "Delivered", "In Progress", "Cancelled"];
  const payment =["Paid","Cash on Delivery", "Un Paid"]
  const handleClose = () => {
    setShow(false)
    setIsEdit(false)
  }
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // Months are 0-indexed
    const year = date.getUTCFullYear();
    
    return `${day}-${month}-${year}`;
  }
  const getOrder = async (id) => {
    setLoading(true)
    try {
      const {data} = await axios.get(`http://localhost:8000/order/${id}`);
      seteditOrder(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }
  
  const getOrders = async () => {
    try {
      let { data } = await axios.get("http://localhost:8000/orders");

      setOrders(data);
    } catch (err) {
      console.log("Error", err);
    }
  };
  const handleEdit = (id) => {
    handleShow()
    setIsEdit(true)
    getOrder(id)
  }
  const delOrder = async(id) => {
    try {
      const data = await axios.delete(`http://localhost:8000/order/${id}`)
    } catch (error) {
      
    }
  }
  useEffect(() => {
    getOrders();
  }, []);
  const editData = async () => {
    try {
      const {data} = await axios.put(`http://localhost:8000/order/${editOrder?._id}`, formData );
      getOrders()
      handleClose()

    } catch (error) {}
  }
  
  return (
    <div>
      <Dashboard/>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Edit" : "Add"} Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className=" bg-primary flex justify-center items-center">
            <div className="bg-white p-4 rounded w-[475px]">
              <h1 className="text-primary py-4 text-center text-2xl">
                <span className="text-orange-500 text-2xl">
                  {" "}
                  {isEdit ? "Edit" : "Add New"} Order
                </span>
              </h1>
              <Divider />

              {loading ? "Loading..." : (
                <Form layout="horizontal">
                <Form.Item label="Total" name="total">
                  <Input
                    placeholder="Total"
                    value={formData.total}
                    defaultValue={isEdit ? editOrder?.total : ""}
                    onChange={(e) =>
                      setFormData({ ...formData, total: e.target.value })
                    }
                  />
                </Form.Item>
               
                <Form.Item label="Delivery Status" name="DeliveryStatus">
                  <Dropdown
                    options={options}
                    value={ formData.delivery_status}
                    placeholder="Select an option"
                    // defaultValue={isEdit ? editOrder?.category : ""}

                    onChange={(e) =>
                      setFormData({ ...formData, delivery_status: e.value })
                    }
                  />
                </Form.Item>
                <Form.Item label="Payment Status" name="Payment Status">
                  <Dropdown
                    options={payment}
                    value={ formData.payment_status}
                    placeholder="Select an option"
                    // defaultValue={isEdit ? editOrder?.category : ""}

                    onChange={(e) =>
                      setFormData({ ...formData, payment_status: e.value })
                    }
                  />
                </Form.Item>
                
               
              </Form>
            


              )}
              
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            block
            className="mt-3"
            onClick={isEdit ? editData : ""}
            disabled={
              
              loading
            }
          >
            {loading ? <SyncOutlined spin /> : "Save"}{" "}
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="container ">
        <div className="d-flex justify-content-between mt-3 ml-20">
          <h2>Orders</h2>
          
        </div>
        <table class="table ml-20">
          <thead>
            <tr>
              <th scope="col">#</th>
            
              <th scope="col">Products</th>
              <th scope="col">Total Amount</th>
              <th scope="col">Delivery Status</th>
              <th scope="col">Payment Status</th>
              <th scope="col">Order Date</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                 
                  <td className='flex flex-col space-y-2'>{order.products.map((item, index) => {
                    return <li>{item.name}</li>
                  })}</td>
                  <td>{order?.total}</td>
                  <td>{order?.delivery_status}</td>
                  <td>{order?.payment_status}</td>
                  <td>{formatDate(order?.createdAt)}</td>
                  <td>
                    <button class="btn btn-secondary mx-2" onClick={() => handleEdit(order._id)} >Update</button>
                    <button
                      class="btn btn-danger"
                      onClick={() => delOrder(order?._id)}
                    >
                      Delete
                    </button>{" "}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Orders
