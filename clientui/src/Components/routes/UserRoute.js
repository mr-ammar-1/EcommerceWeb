import { useEffect, useState } from "react";
import axios from "axios";
import {SyncOutlined} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../axiosscall";

const UserRoute = ({ children }) => {
   const [visible, setVisible] = useState(false); 
   const router = useNavigate();

   useEffect(() => {
        fetchUser();
   }, []);

   const fetchUser = async () => {
    try {
        const { data } = await axiosInstance.get("http://localhost:8000/fetch-logged-user");  
        if (data.ok) setVisible(true);
       console.log(data);
    } catch (err){
        console.log(err);
        setVisible(false);
      
    }
}
    return (
     <> 
       {!visible ? (
        <SyncOutlined spin 
        className="d-flex justify-content-center display-1 text-primary p-5" /> 
        ) : (
           
                   
                       {children}
           
        )} 
      </>
      );
    }
export default UserRoute;