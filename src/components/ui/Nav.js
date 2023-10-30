import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import resume from "../../static/Resume of Shuai Hao.pdf";

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
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}