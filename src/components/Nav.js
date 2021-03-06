import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import resume from "../static/Resume of Shuai Hao.pdf";

export default function SimpleNav() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="#home">Shuai Hao</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href={resume}>Resume</Nav.Link>
                <Nav.Link href="https://observablehq.com/@haoshuai999/why-i-choose-data-journalism">My Story</Nav.Link>
                <Nav.Link href="https://observablehq.com/@shuaihaofzny">Observable</Nav.Link>
                <Nav.Link href="https://github.com/haoshuai999">GitHub</Nav.Link>
                <Nav.Link href="mailto: shuaihao@outlook.com">Contact</Nav.Link>
                {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown> */}
                </Nav>
                {/* <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
                </Form> */}
            </Navbar.Collapse>
        </Navbar>
    )
}