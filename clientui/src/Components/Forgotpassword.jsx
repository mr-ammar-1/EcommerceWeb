import React, { useState, useContext, useEffect } from "react";
import { Context } from "../context";
import axios from "axios";
import {toast} from "react-toastify";
import {SyncOutlined} from "@ant-design/icons"
import { Link, useNavigate } from "react-router-dom";
import Divider from "./Divider";
import { Form, Input, Button, message } from "antd";


const Forgotpassword = () => {
  /* states */
  const [email, setEmail] =  useState(""); 
  const [success, setSuccess] =  useState(false); 
  const [code, setCode] =  useState(""); 
  const [newPassword, setNewPassword] =  useState(""); 
  const [loading, setLoading] =  useState(false); 

  /* context */
  const { 
    state: { user},
 } = useContext(Context);
 /* router */

const router = useNavigate();
 // redirect if user is logged in already
 useEffect(()=> {
       if(user !== null) router("/");  
 },[user]);

 const handleBtnForgotPsd = async (e) => {
     e.preventDefault();
     try{
        setLoading(true);
        const { data } = await axios.post("http://localhost:8000/forgot-password", {email});
        setSuccess(true);
        toast("We have sent code, check your email for Password Reset secret code")
        setLoading(false);
     } catch (err){
        setLoading(false);
        toast(err.response.data);
     }
 }
 const handleBtnResetPsd = async (e) => {
       e.preventDefault();
   //  console.log(email, code, newPassword);
    try{
       setLoading(true);
       const { data } = await axios.post("http://localhost:8000/reset-password", {
         email,
         code,
         newPassword
       });
       setEmail("");
       setCode('');
       setNewPassword("");
       setLoading(false);
       toast("Password Updated: Now you can login with your new password");
    } catch (err){
       setLoading(false);
       toast(err.response.data);
    }
 };

  return (
    <>


<div className="h-screen bg-primary flex justify-center items-center">
      <div className="bg-white p-4 rounded w-[475px]">
        <h1 className="text-primary py-4 text-center text-2xl">
          Shopify |{" "}
          <span className="text-orange-500 text-2xl"> Market Place</span>
          <br />
          Forgot Password
        </h1>
        <Divider />

        <Form layout="vertical">
          <Form.Item label="Email" name="email">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email..."
              required
            />
          </Form.Item>
          



          {success && (
              <>
              <Form.Item label="Code" name="code">
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter Secret code..."
              required
              
            />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter New Password..."
              required
              
            />
          </Form.Item>
              </> 
             )}




          <Button
            type="primary"
            htmlType="submit"
            block
            className="mt-3"
            onClick={success ? handleBtnResetPsd : handleBtnForgotPsd}
            disabled={!email || loading}
          >
            {loading ? <SyncOutlined spin /> : "Send"}
          </Button>

          <div className="mt-5 text-center">
            <span className="text-orange-700">
             Back To Login ? {" "}
              <Link className="text-primary" to="/">
                Login
              </Link>
            </span>
      
          </div>

          
        </Form>
      </div>
    </div>






















     
    </>
  );
};
export default Forgotpassword