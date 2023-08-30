import React, { useState, useEffect } from "react";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  Row,
  Col,
  Alert,
} from "react-bootstrap";

import Users from "../Components/Users";

import axios from "axios";
import User from "../apicall/products";
import TopHeader from "../Components/TopHeader";
import { SetSearch } from "../redux/usersSlice";
import { useLocation } from "react-router-dom";

const Productspage = ({ searchProduct, isSort, searchFilter, iuser }) => {
  // const [iuser, setiUsers] = useState(User);

  const total_user = iuser.length;
  const { pathname } = useLocation();
  return (
    <div>
      <Container className="gap">
        <Row>
          <Col xs="4">
            {pathname === "/user/AllProducts" ? (
              <Alert variant="warning">
                <strong className="primary_text">
                  Total Products: {total_user} <i class="ri-user-3-line"></i>{" "}
                </strong>
              </Alert>
            ) : (
              <Alert variant="warning">
                <strong className="primary_text">
                  Latest Products <i class="ri-user-3-line"></i>{" "}
                </strong>
              </Alert>
            )}
          </Col>
        </Row>
        <Row>
          {
            pathname === "/user/AllProducts"
              ? iuser
                  .sort((a, b) => a.id - b.id)
                  .filter((user) => {
                    if (searchProduct.length > 0) {
                      return user.name
                        ?.toLowerCase()
                        .includes(searchProduct?.toLowerCase());
                    } else
                      return user.category
                        ?.toLowerCase()
                        .includes(searchFilter?.toLowerCase());
                  })
                  .map((user) => (
                    <Col key={user.slug}>
                      <Users user={user} />
                    </Col>
                  ))
              : 
               iuser
                  .sort((a, b) => b.id - a.id)
                  .slice(0, 6)
                  .filter((user) => {
                    if (searchProduct.length > 0) {
                      return user.name
                        ?.toLowerCase()
                        .includes(searchProduct?.toLowerCase());
                    } else
                      return user.category
                        ?.toLowerCase()
                        .includes(searchFilter?.toLowerCase());
                  })
                  .map((user) => (
                    // Your mapping logic here
                    <Col key={user.slug}>
                      <Users user={user} />
                    </Col>
                  ))

            // Your mapping logic here

            // Return null for other indices
          }
        </Row>
      </Container>
    </div>
  );
};

export default Productspage;
