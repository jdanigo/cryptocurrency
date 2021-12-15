import React from "react";
import {
  Nav,
  Navbar,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Link , Outlet} from "react-router-dom";
function DefaultLayout({ children }) {
  return (
    <div data-testid="layout">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>Cripto Currency</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link className="nav-link" to="/dashboard">
              Dashboard
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container fluid>
        <Row className="mt-2">
          <Col>{children}</Col>
        </Row>
      </Container>
      <Outlet />      
    </div>
  );
}

export default DefaultLayout;
