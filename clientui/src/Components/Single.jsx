


import React from 'react'
import { Button, Card,Col, Row } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap"
import { user_images } from "../apicall/data"
import {useNavigate, useParams} from "react-router-dom"
import {  useCart } from "react-use-cart";
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { toast } from "react-toastify";


const Single = ( {name,price,category,rating, description,picture} ) => {

  const { addItem } = useCart();
    const {id} = useParams();
    const navigate = useNavigate();
  
    
  return (
    <Row className='items-center' >

      <Col>
        <Card key={id} style={{ width: '25rem', height: '30rem' }}>
          <LinkContainer to={`/user/product/${id}`}>
            <Card.Img className='w-full h-full object-cover'  variant="top" src={picture} />
          </LinkContainer>
        </Card>
      </Col>

      <Col>
      <Card key={id} style={{ width: '30rem' }}>
          <Card.Body>
            <Card.Title> <strong>Name: </strong> {name}</Card.Title>
            <Card.Text>
            <hr />
            <strong>Category: </strong> {category}   <br /><br />
              
            <strong>Price: </strong> {price} <b>$</b>  <br /><br />
            <Typography component="legend">Rating</Typography>
          <Rating name="read-only" value={parseInt(rating)} readOnly />
          <br />
              <hr />
             
              <strong>Description: </strong> {description}  <br /><br />
      
             
     
     
        <hr />

           <LinkContainer to="/user/AllProducts">
                     <Button variant="danger">Back to Products </Button>
            </LinkContainer>
            &nbsp; &nbsp; &nbsp;
            <LinkContainer to="/Cart">
                     <Button variant="success" onClick={() => addItem({id, name, price}) }> Add To Cart </Button>
                     {/* {toast.success("Item added successfully")} */}
            </LinkContainer>


            </Card.Text>
          

          </Card.Body>
        </Card>
        </Col>
</Row>


  )
}

export default Single