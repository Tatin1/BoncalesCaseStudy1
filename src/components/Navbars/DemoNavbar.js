import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
} from "reactstrap";
import routes from "routes.js";

function DemoNavbar(props) {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const dropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const getBrand = () => {
    let name = "Brand";
    routes.forEach((prop) => {
      if (!prop.collapse) {
        if (prop.redirect) {
          if (prop.path === location.pathname) {
            name = prop.name;
          }
        } else {
          if (prop.layout + prop.path === location.pathname) {
            name = prop.name;
          }
        }
      }
    });
    return name;
  };

  const openSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
  };

  return (
    <Navbar color="dark" expand="lg" className="navbar-absolute fixed-top">
      <Container fluid>
        <div className="navbar-wrapper">
          <div className="navbar-toggle">
            <button
              type="button"
              className="navbar-toggler"
              onClick={() => openSidebar()}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <NavbarBrand href="/">{getBrand()}</NavbarBrand>
        </div>
        <NavbarToggler onClick={toggle}>
          <span className="navbar-toggler-bar" />
          <span className="navbar-toggler-bar" />
          <span className="navbar-toggler-bar" />
        </NavbarToggler>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
          
            <Dropdown nav isOpen={dropdownOpen} toggle={dropdownToggle}>
              <DropdownToggle caret nav>
                <i className="now-ui-icons users_single-02" />
                <p>Account</p>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <Link to="/User" className="dropdown-item">
                    User Profile
                  </Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to="/Login" className="dropdown-item">
                    Logout
                  </Link>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default DemoNavbar;
