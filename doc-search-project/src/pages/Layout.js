import { Outlet, Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav } from "react-bootstrap";
import "../styles/navbar.css";

const Layout = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Navbar.Brand href="/nppesSearch">NPI Online</Navbar.Brand>

          <Nav className="mr-auto">
            <LinkContainer to="/nppesSearch">
              <Nav.Link>Provider Search</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Outlet />
    </>
  );
};

export default Layout;
