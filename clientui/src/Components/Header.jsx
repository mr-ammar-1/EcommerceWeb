import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import { Button,Row,Col } from "react-bootstrap";
import {useNavigate} from "react-router-dom";


function Header() {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const navigate = useNavigate();

  return (
    <div>
     <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Home" onClick={() => navigate("./user/Home")} />
          <Tab label="Products" onClick={() => navigate("./user/AllProducts")} />
          <Tab label="About Us" onClick={() => navigate("./user/AboutUs")} />
          <Tab
            label="Customer Support"
            onClick={() => navigate("./user/CustomerSupport")}
          />
        </Tabs>
      </Box>
    </div>
  );
}

export default Header;
