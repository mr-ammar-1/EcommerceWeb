import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {toast} from "react-toastify";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

  async function submit(e) {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:8000/signup", {
          email,
          password,
        })
      
            
          
        
        toast.success("Signup successful, Please login.");
    } catch(err){
      toast.error(err.response.data);
  
    }
  }

  return (
    <div className="login">
      <Box
        sx={{
          width: 400,
          maxWidth: "100%",
          marginBottom: 1,
          marginTop: 2,
        }}
      >
        <h1>SignUp</h1>
      </Box>

      <Box
        sx={{
          width: 400,
          maxWidth: "100%",
          marginBottom: 1,
          marginTop: 2,
        }}
      >
        <TextField
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder=""
          label="Email"
          fullWidth
        />
      </Box>
      <br />
      <Box
        sx={{
          width: 400,
          maxWidth: "100%",
          marginBottom: 2,
        }}
      >
        <TextField
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder=""
          label="Password"
          fullWidth
        />
      </Box>
      <Box
        sx={{
          width: 400,
          maxWidth: "100%",
          marginBottom: 2,
        }}
      >
        <Button onClick={submit} variant="contained">
          Submit
        </Button>
      </Box>

      <p>OR</p>
      <Box
        sx={{
          width: 400,
          maxWidth: "100%",
          marginBottom: 2,
        }}
      >
        <Button onClick={() => history("/")} variant="outlined">
          Login
        </Button>
      </Box>
    </div>
  );
}

export default SignUp;
