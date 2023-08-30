import { useState } from "react";
import bgImg from "./register.jpg";
import Divider from "./Divider";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {SyncOutlined} from "@ant-design/icons"


const Resgister = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

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
          toast.success("Signup successful, Please login.");
          setLoading(false);
          // console.log("SIGNUP RESPONSE: ", data);
        } catch(err) {
          toast.error(err.response.data);
          setLoading(false);
        }
  }
  return (
    <div className="h-screen bg-primary flex justify-center items-center">
      <div className="bg-white p-4 rounded w-[475px]">
        <h1 className="text-primary py-4 text-center text-2xl">
          Shopify |{" "}
          <span className="text-orange-500 text-2xl"> Market Place</span>
          <br />
          Signup
        </h1>
        <Divider />

        <Form layout="vertical">
          <Form.Item label="Name" name="name">
            <Input
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </Form.Item>
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
            disabled={!formData.name || !formData.email || !formData.password || loading}
          >
                        {loading ? <SyncOutlined spin /> : "Signup"}
            {" "}
            
          </Button>
          <div className="mt-5 text-center">
            <span className="text-orange-700">
              Already have an Account?{" "}
              <Link className="text-primary" to="/">
                Login
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Resgister;
