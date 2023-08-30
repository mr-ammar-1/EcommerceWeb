import React, { useContext, useEffect, useState } from 'react'
import Dashboard from './Dashboard'
import { Context } from "../../context";
import axios from 'axios';

import Modal from 'react-bootstrap/Modal';
import Divider from "../../Components/Divider";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import {SyncOutlined} from "@ant-design/icons"


const ManageUsers = () => {
  // const [state] = useContext(Context)
  // const {GET_USERS} = state

  const [usersArray, setUsersArray] = useState([])

  
  const [isEdit, setIsEdit] = useState(false)
  const [show, setShow] = useState(false);

  const [editUser ,setEditUser] = useState({})
  const handleClose = () => {
    setShow(false)
    setIsEdit(false)
  }
  const handleShow = () => setShow(true);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const getUser = async (id) => {
    setLoading(true)
    try {
      const {data} = await axios.get(`http://localhost:8000/user/${id}`);
      setEditUser(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }
  const getUsers = async() => {
      try{
          let {data} = await axios.get("http://localhost:8000/users")
       
          setUsersArray(data);
          
      } catch(err) {
          console.log("Error", err);
      }
  }

  const delUser = async(id) => {
    try {
      const data = await axios.delete(`http://localhost:8000/users/${id}`)
    } catch (error) {
      
    }
  }

  useEffect(() => {
      getUsers()
  }, [])

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // Months are 0-indexed
    const year = date.getUTCFullYear();
    
    return `${day}-${month}-${year}`;
  }

  async function submit(e) {
    e.preventDefault();

   
      
      
        try { 
          setLoading(true);
          const {data} = await axios
          .post("http://localhost:8000/SignUp", {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          })
          toast.success("User Added Successfully ....");
          setUsersArray([...usersArray, data])
          setLoading(false);
          handleClose()
          // console.log("SIGNUP RESPONSE: ", data);
        } catch(err) {
          toast.error(err.response.data);
          setLoading(false);
        }
  }

  const editData = async () => {
    try {
      const {data} = await axios.put(`http://localhost:8000/user/${editUser?._id}`, formData );
      getUsers()
      handleClose()

    } catch (error) {}
  }
  const handleEdit = (id) => {
    handleShow()
    setIsEdit(true)
    getUser(id)
  }

  return (
    <div >
      <Dashboard/>
      <Modal centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Edit" : "Add"} User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className=" bg-primary flex justify-center items-center">
      <div className="bg-white p-4 rounded w-[475px]">
        <h1 className="text-primary py-4 text-center text-2xl">
        {" "}
                  {isEdit ? "Edit" : "Add New"} User
         
        </h1>
        <Divider />
        {loading ? "Loading..." :(
        <Form layout="vertical">
          <Form.Item label="Name" name="name">
            <Input
              placeholder="Name"
              value={formData.name}
              defaultValue={isEdit ? editUser?.name : ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input
              placeholder="Email"
              value={formData.email}
              defaultValue={isEdit ? editUser?.email : ""}

              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input
              placeholder="Password"
              value={formData.password}
              defaultValue={isEdit ? editUser?.password : ""}

              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </Form.Item>
          
          
        </Form>)}
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
            onClick={isEdit ? editData : submit}
            disabled={  !isEdit &&  !formData.name || !isEdit &&  !formData.email || !isEdit && !formData.password || loading}
          >
                        {loading ? <SyncOutlined spin /> : "Save"}
            {" "}
            
          </Button>
        </Modal.Footer>
      </Modal>
      <div className='container '>
      <div className="d-flex justify-content-between mt-3 ml-20">
                <h2>Users</h2>
                <button className="btn btn-success" onClick={handleShow}>+Add</button>
            </div>
            <table class="table ml-20">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {usersArray?.map((user, index) => {
                      return <tr>
                      <td>{index + 1}</td>
                      <td>{user?.name}</td>
                      <td>{user?.email}</td>
                      <td>{formatDate(user?.createdAt)}</td>
                      <td><button class="btn btn-secondary mx-2" onClick={() => handleEdit(user._id)} >Update</button>
                      <button class="btn btn-danger" onClick={() => delUser(user?._id)}>Delete</button> </td>
                  </tr>
                    }) }
                    
                </tbody>
            </table>
      </div>
    </div>
  )
}

export default ManageUsers
