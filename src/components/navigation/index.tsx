import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  NavbarToggler,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarText,
} from "reactstrap";

export interface INavigationProps {}

const Naviagtion: React.FunctionComponent<INavigationProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  // const mobileToggle = () => {
  //   if (
  //     /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  //       navigator.userAgent
  //     )
  //   ) {
  //     setIsOpen(!isOpen);
  //   }
  // };

  return (
    <Navbar
      fixed="top"
      style={{ backgroundColor: "black", opacity: 0.9 }}
      light
      expand="md"
    >
      <NavbarBrand
        className="md-auto navbar-header .navbar-brand"
        tag={Link}
        to="/"
        style={{ color: "white", height: "3" }}
      >
        <h4>DR OYELOLA ADEGBOYE</h4>
      </NavbarBrand>
      <NavbarToggler onClick={toggle} style={{ backgroundColor: "white" }} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/" style={{ color: "white" }}>
              Home
            </NavLink>
          </NavItem>
          {isOpen ? (
            <NavbarText className="ml-2 mr-2" style={{ color: "white" }}>
              |
            </NavbarText>
          ) : (
            ""
          )}
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle style={{ color: "white" }} nav caret>
              Publications
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>Books</DropdownItem>
              <DropdownItem>Article</DropdownItem>
              <DropdownItem>Current Projects</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          {isOpen ? (
            <NavbarText className="ml-2 mr-2" style={{ color: "white" }}>
              |
            </NavbarText>
          ) : (
            ""
          )}
          <NavItem>
            <NavLink style={{ color: "white" }}>Awards</NavLink>
          </NavItem>
          {isOpen ? (
            <NavbarText className="ml-2 mr-2" style={{ color: "white" }}>
              |
            </NavbarText>
          ) : (
            ""
          )}
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle style={{ color: "white" }} nav caret>
              About
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>Bio</DropdownItem>
              <DropdownItem>Journey</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Resume</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <NavbarText  >
         <NavLink style={{ color: "blue" }} href="https://www.linkedin.com/in/oyelola-adegboye-phd-cstat-csci-fimc-cmc-15495423/" rel="noopener noreferrer" target="_blank"><i className="fab fa-linkedin-in"></i></NavLink>
        </NavbarText>
        <NavbarText className="ml-2 mr-2" style={{ color: "white" }}>
          |
        </NavbarText>
        <NavbarText style={{ color: "blue" }}>
        <NavLink style={{ color: "blue" }} href="http://facebook.com/" rel="noopener noreferrer" target="_blank"><i className="fab fa-facebook-f"></i></NavLink> 
        </NavbarText>
        <NavbarText className="ml-2 mr-2"></NavbarText>
      </Collapse>
    </Navbar>
  );
};

export default Naviagtion;
