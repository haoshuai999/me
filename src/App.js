import React, { useState } from 'react';
import SimpleNav from "./components/Nav";
import Article from "./components/Article";
import Slide from "./components/Slide";
import SimpleCard from "./components/Card"

import christmas from "./images/christmas.jpg"

import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
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
          <Image src={christmas} alt="profile" fluid />
        </Col>
        <Col sm={8} className="p-5 my-auto">
          <h1>Hello, world! I'm Shuai Hao.</h1>
          <p>I am a journalist, programmer and designer. I graduated from Columbia University's dual degree program in Journalism and Computer Science</p>
          <Button variant="primary">Portfolios</Button>{' '}
        </Col>
      </Row>
      <Tabs className="justify-content-center" defaultActiveKey="Interactives" id="uncontrolled-tab-example">
        <Tab eventKey="Interactives" title="Interactives">
          <Row className="p-2">
            <Col>
              <Article />
            </Col>
          </Row>
          <Row className="p-2">
            <Col>
              <Article />
            </Col>
          </Row>
          <Row className="p-2">
            <Col>
              <Article />
            </Col>
          </Row>
          <Row className="p-2">
            <Col>
              <Article />
            </Col>
          </Row>
        </Tab>
        <Tab eventKey="Charts" title="Charts">
          <Row className="p-2">
            <Col>
              <Slide />
            </Col>
          </Row>
          <Row className="p-2">
            <Col>
              <SimpleCard />
            </Col>
            <Col>
              <SimpleCard />
            </Col>
          </Row>
          <Row className="p-2">
            <Col>
              <SimpleCard />
            </Col>
            <Col>
              <SimpleCard />
            </Col>
          </Row>
        </Tab>
        <Tab eventKey="Articles" title="Articles">
          <Row className="p-2">
            <Col>
              <SimpleCard />
            </Col>
            <Col>
              <SimpleCard />
            </Col>
          </Row>
          <Row className="p-2">
            <Col>
              <SimpleCard />
            </Col>
            <Col>
              <SimpleCard />
            </Col>
          </Row>
        </Tab>
      </Tabs>
    </Container>
  );
}

export default App;
