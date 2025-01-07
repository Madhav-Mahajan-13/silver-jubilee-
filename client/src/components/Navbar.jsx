import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation(); // Get the current location

  return (
    <Navbar expand="lg" style={{ 
      backgroundColor: "#000000", 
      borderBottom: "2px solid #c0c0c0" 
    }}>
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ color: "#c0c0c0" }}>
          <img
            src="https://picsum.photos/200" // Replace with your logo path
            alt="Logo"
            width="40"
            height="40"
            className="d-inline-block align-top rounded-circle"
          />
          {' '}Silver Jublee
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"  style={{              color: "#c0c0c0",        }}/>
        <Navbar.Collapse id="basic-navbar-nav" style={{              color: "#c0c0c0",        }}>
          <Nav className="ms-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              className={location.pathname === "/" ? "active" : ""}
              style={{
                color: "#c0c0c0",
                borderBottom: location.pathname === "/" ? "2px solid silver" : "none",
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/memories" 
              className={location.pathname === "/memories" ? "active" : ""}
              style={{
                color: "#c0c0c0",
                borderBottom: location.pathname === "/memories" ? "2px solid silver" : "none",
              }}
            >
              Memories
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/eventflow" 
              className={location.pathname === "/eventflow" ? "active" : ""}
              style={{
                color: "#c0c0c0",
                borderBottom: location.pathname === "/eventflow" ? "2px solid silver" : "none",
              }}
            >
              EventFlow
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/register" 
              className={location.pathname === "/register" ? "active" : ""}
              style={{
                color: "#c0c0c0",
                borderBottom: location.pathname === "/register" ? "2px solid silver" : "none",
              }}
            >
              Registration
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;