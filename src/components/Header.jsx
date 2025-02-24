import React, {useState} from "react";

import logo from "../assets/deposit.jpg";

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    NavLink, 
  } from "reactstrap"
  

const Header = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
    <>
    <Navbar color="primary" dark expand="md">
        <NavbarBrand>
        <img src={logo} width="50px;" style={{paddingRight: "5px"}}/>
        Aquário de Cuiabá
        </NavbarBrand>
        <NavbarToggler onClick={toggle}/>
        <Collapse isOpen={isOpen} navbar>
            <Nav className="ms-auto" navbar>
                <NavItem>
                    <NavLink tag={Link} to="/">
                        Home
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="/users">
                        Users
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="/feedback">
                        Feedback
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="/inscricao">
                        Inscricao
                    </NavLink>
                </NavItem>                
            </Nav>
        </Collapse>
    </Navbar>
    </>
    );
}


export default Header;