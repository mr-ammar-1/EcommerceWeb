import React from "react";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "../Css/custom.css";
import Button from "@mui/material/Button";
import { Container } from "@mui/system";
import { Carousel } from "react-bootstrap";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import mainImg from "./mainImg.png";
import img1 from "./img1.jpg";
import img2 from "./img2.jpg";
import img3 from "./img3.jpeg";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { DisabledByDefault } from "@mui/icons-material";
import { CartProvider, useCart } from "react-use-cart";
import { useDispatch } from "react-redux";
import { useState, useEffect, useContext } from "react";
import { Context } from "../context";
import axios from "axios";

import { toast } from "react-toastify";

import {
  AppstoreOutlined,
  LoginOutlined,
  UserAddOutlined,
  LogoutOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

const { Item, SubMenu } = Menu;



const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

function TopHeader({setSearch}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const {
    isEmpty,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
  } = useCart();

  const navigate = useNavigate();
  

  const { state, dispatch } = useContext(Context);
  const { user } = state;
  const [current, setCurrent] = useState("");

  
  // useEffect(() => {
  //   process.browser && setCurrent(window.location.pathname);
  // }, [process.browser && window.location.pathname]);

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
    const { data } = await axios.get("http://localhost:8000/logout");
    toast.success(data.message);
    navigate("/");
  };
  

  return (
  
    <div className="maindiv">
     
      <nav>
        <div className="mycontainer" style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div className="mainlogo">
            <img src={mainImg}  alt="" />
          </div>
          <Box
            sx={{
              width: 600,
              maxWidth: "100%",
              display: "flex",
              alignItems: "center"
            }}
          >
            <TextField className="searchbar" onChange={(e)=>setSearch(e.target.value)}  placeholder="Search..." fullWidth id="fullWidth" />
          <IconButton className="search" aria-label="delete" size="small">
            <SearchIcon fontSize="large" />
          </IconButton>
          <div className="carticon">
            <IconButton aria-label="cart" onClick={()=>navigate('/Cart')}>
              <StyledBadge badgeContent={totalUniqueItems} color="secondary">
                <ShoppingCartIcon fontSize="large" />
              </StyledBadge>
            </IconButton>
          </div>
         
          </Box>
          <Box className="cta">
          <Menu mode="horizontal">
          {user !== null && (
        <SubMenu 
        icon={<MenuOutlined />}
        title={user && user.name}
        className=""
        >
          <Item
            onClick={logout}
            icon={<LogoutOutlined />}
            style={{ marginLeft: "10px" }}
            >
            <a>Logout</a>
          </Item>
        </SubMenu>
      )}
          
          </Menu>
          
          </Box>
        </div>
      </nav>

      
    </div>
  );
}

export default TopHeader;
