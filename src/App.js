import React, { useRef, useState, useEffect } from 'react';
import SimpleNav from "./components/Nav";
import Article from "./components/Article";
import Slide from "./components/Slide";
import SimpleCard from "./components/Card";
import Returns from "./components/Returns";
import HeatmapExample from "./components/Heatmap";

import christmas from "./images/christmas.jpg"

import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

const useContainerDimensions = myRef => {
  const getDimensions = () => ({
    width: myRef.current.offsetWidth - 60,
    height: myRef.current.offsetHeight
  })

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getDimensions())
    }

    if (myRef.current) {
      setDimensions(getDimensions())
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [myRef])

  return dimensions;
};

function App() {
  const ref = useRef(null);
  const componentRef = useRef();
  const { width, height } = useContainerDimensions(componentRef);
  console.log(width);
  console.log(height);

  const handleClick = () => {
    console.log(ref.current);
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

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
          <Button variant="primary" onClick={handleClick}>Portfolios</Button>{' '}
        </Col>
      </Row>
      <div ref={ref}></div>
      <Tabs className="justify-content-center sticky" defaultActiveKey="Interactives" id="uncontrolled-tab-example">
        <Tab eventKey="Interactives" title="Interactives">
          <Row className="p-2">
            <Col ref={componentRef}>
              <Article chart= {<HeatmapExample width = {width}/>}/>
            </Col>
          </Row>
          <Row className="p-2">
            <Col>
              <Article chart= {<Returns width = {width}/>}/>
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
      <Row className="m-2 p-3 text-center footer">
        <Col>
          <footer>
            <p>Designed using React and Bootstrap</p>
            <p>Email: <a href="mailto:shuai_hao@outlook.com">shuai_hao@outlook.com</a></p>
            <p>All Content © 2021 Shuai Hao</p>
          </footer>
        </Col>
      </Row>
    </Container>
  );
}

// class ReadyToScroll extends Component {
//   constructor(props) {
//     super(props);
//     this.myRef = React.createRef();
//   }
//   render() {
//     return <div ref={this.myRef}>Element to scroll to</div>;
//   }

//   executeScroll = () => this.myRef.current.scrollIntoView();
//   // run this method to execute scrolling.
// }

export default App;
