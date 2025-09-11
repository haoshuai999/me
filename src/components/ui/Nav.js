import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import resume from "../../static/Resume of Shuai Hao.pdf";

export default function SimpleNav() {
    return (
        <>
            <Navbar className="nav-color p-2 rounded" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Shuai Hao</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href={resume} target="_blank">Resume</Nav.Link>
                            <Nav.Link href="https://observablehq.com/@haoshuai999/why-i-choose-data-journalism" target="_blank">My Story</Nav.Link>
                            <Nav.Link href="https://observablehq.com/@shuaihaofzny" target="_blank">Observable</Nav.Link>
                            <Nav.Link href="https://github.com/haoshuai999" target="_blank">GitHub</Nav.Link>
                            <Nav.Link href="mailto: shuaihao@outlook.com" target="_blank">Contact</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}