


import React, {useState} from 'react'
import { Button, Card } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap"
import { user_images } from "../apicall/data"
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

const Users = (props) => {
  const { name,_id, description,price,picture,rating,slug } = props.user;

  const [value, setValue] = React.useState(4);



  return (

    <div>
  
      <Card key={slug} style={{ width: '21.5rem', marginBottom: "15px" }}>
        <LinkContainer to={`/user/product/${slug}`} style={{
          width: "100%",
          height: "15rem",
          objectFit: "contain"
        }}>
          <Card.Img className=""  variant="top" src={picture} />
        </LinkContainer>
        <Card.Body>
          
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            <hr />
            <strong>Price : </strong>   {price} <b>$</b><br />
           
          </Card.Text>
          <Typography component="legend">Rating</Typography>
          <Rating name="read-only" value={rating} readOnly />
          <br />
          <LinkContainer to={`/user/product/${slug}`}>
            <Button variant="primary"> Shop Now  < i class="ri-user-add-fill"></i></Button> 
          
          </LinkContainer>

          &nbsp;&nbsp;
           
      

        </Card.Body>
      </Card>


        
    </div>
     
  )
}

export default Users