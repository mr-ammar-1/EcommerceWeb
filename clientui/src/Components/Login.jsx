import React, { useState, useContext, useEffect } from "react";
import { Context } from "../context";
import bgImg from "./register.jpg";
import Divider from "./Divider";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {SyncOutlined} from "@ant-design/icons"

const Login = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  

  const { state: {user}, dispatch } = useContext(Context);

 


  async function submit(e) {
    e.preventDefault();


      try { 
        setLoading(true);
        const {data} =  await axios.post("http://localhost:8000/login", {
    
          email: formData.email,
          password: formData.password,
        }, 
  )

        console.log("LOGIN RESPONSE: ", data);
        dispatch({
           type: "LOGIN",
           payload: data
        })
        // save in local storage
        localStorage.setItem("user", JSON.stringify(data));
        // localStorage.setItem("token",data)
        // redirect
        
        {data && data.role && data.role.includes("Admin") ? (
          history("/admin/Dashboard"))
         :
         history("/user/Home")
        
         }
      

        setLoading(false);     
      } catch(err) {
        toast.error(err.response.data);
        setLoading(false);
      }

      
  }
  // useEffect(() => {
  //   if(localStorage.getItem("token")){
  //     history("/user/Home")
  //     }
  //     //window.location.href = "/";
  //   })
  return (
    <div className="h-screen bg-primary flex justify-center items-center">
      <div className="bg-white p-4 rounded w-[475px]">
        <h1 className="text-primary py-4 text-center text-2xl">
          Shopify |{" "}
          <span className="text-orange-500 text-2xl"> Market Place</span>
          <br />
          Login
        </h1>
        <Divider />

        <Form layout="vertical">
          <Form.Item label="Email" name="email">
            <Input
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input
              placeholder="Password"
              value={formData.password}
              type="password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            className="mt-3"
            onClick={submit}
            disabled={ !formData.email || !formData.password || loading}
          >
            {" "}
            {loading ? <SyncOutlined spin /> : "Login"}
          </Button>
          <div className="mt-5 text-center">
            <span className="text-orange-700">
              Don't have an Account?{" "}
              <Link className="text-primary" to="/signup">
                SignUp
              </Link>
            </span>
            <br />
            <span className="text-orange-700">
             Click Here To Forgot Password ?{" "}
              <Link className="text-primary" to="/forgot-password">
                Forgot Password
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
