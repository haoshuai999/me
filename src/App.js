import React, { useState } from 'react';
import SimpleNav from "./components/Nav";
import profile from "./images/christmas.jpg"
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

function App() {
  return (
    <Container fluid>
      <Row>
        <Col>
          <SimpleNav />
        </Col>
      </Row>
      <Row className="full-height">
        <Col sm={4} className="pt-5 pb-5 my-auto">
          <Image src={profile} alt="profile" fluid />
        </Col>
        <Col sm={8} className="p-5 my-auto">
          <h1>Hello, world! I'm Shuai Hao.</h1>
          <p>I am a journalist, programmer and designer. I graduated from Columbia University's dual degree program in Journalism and Computer Science</p>
          <Button variant="primary">Portfolios</Button>{' '}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
