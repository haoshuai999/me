import React, { useRef, useState, useEffect } from 'react';
import SimpleNav from "./components/Nav";
import Article from "./components/Article";
import Slide from "./components/Slide";
import SimpleCard from "./components/Card";
import Returns from "./components/Returns";
import Bar from "./components/Bar";
import Heatmap from "./components/Heatmap";
import Cosmos from "./components/Cosmos";
import Radial from "./components/Radial";
import Tree from "./components/Tree";
import Congress from "./components/Congress";
import Chinamap from "./components/Map";
import Candidate from "./components/Candidate";
import Intro from "./components/Intro";

import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

const useContainerDimensions = myRef => {
  const getDimensions = () => ({
    width: (myRef.current.offsetWidth) < 1000 ? myRef.current.offsetWidth : 1000,
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

    window.addEventListener("click", handleResize)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("click", handleResize)
      window.removeEventListener("resize", handleResize)
    }
  }, [myRef])

  return dimensions;
};

function App(props) {
  const ref = useRef(null);
  const componentRef = useRef(null);
  const { width, height } = useContainerDimensions(componentRef);

  const interactives = [
    {id: "interactive-0", interactive: <Chinamap width = {width}/>, title: "Chinese NPC Deputy Map", description: "Use react and D3 to show the population and the number of NPC deputies of each Chinese province.", link: "https://haoshuai999.github.io/china-data-map/", date: "Aug. 8 2021"},
    {id: "interactive-1", interactive: <Returns width = {width}/>, title: "Crypto Returns Over Time", description: "Fetch the lastest crypto returns data using the notebook.", link: "https://observablehq.com/d/99803321128e165f", date: "Sept. 14 2020"},
    {id: "interactive-2", interactive: <Candidate width = {width}/>, title: "The 2020 Singaporean General Election", description: "I made an interactive bar chart and a world map showing the growth of female political candidates in Singapore.", link: "https://observablehq.com/d/fb5ed6161a8a33b8", date: "Sept. 2 2021"},
    {id: "interactive-3", interactive: <Cosmos width = {width}/>, title: "The Growth of Cosmos India", description: "Cosmos aims to be the internet of blockchain. Cosmos's token ATOM and its Indian branch grows fast in 2020.", link: "https://observablehq.com/d/51fbdbc746a1de7e", date: "Oct. 1 2020"},
    {id: "interactive-4", interactive: <Bar width = {width}/>, title: "Vertical Returns Bar Chart", description: "Compare the returns of different crypto assets.", link: "https://observablehq.com/d/576de58dae43c14e", date: "Sept. 20 2020"},
    {id: "interactive-5", interactive: <Heatmap width = {width}/>, title: "BTC Returns Heatmap", description: "Bitcoin performs better on US trading hours than Asian trading hours.", link: "https://observablehq.com/@shuaihaofzny/heatmap-example", date: "Sept. 30 2020"},
    {id: "interactive-6", interactive: <Radial width = {width}/>, title: "Coinbase Growth", description: "Total assets on Coinbase increased nearly 150% in 2021Q1.", link: "https://observablehq.com/d/684a54bcf8262fbd", date: "Apr. 3 2021"},
    {id: "interactive-7", interactive: <Congress width = {width}/>, title: "Blockchain and Congress", description: "Most lawmakers don't hold any opinion towards blockchain technology.", link: "https://observablehq.com/d/4cbd138614bf115f", date: "Jan. 7 2021"},
    {id: "interactive-8", interactive: <Tree width = {width}/>, title: "Crypto Family Tree", description: "Many crypto assets are related to each other through forking.", link: "https://observablehq.com/d/6a0e7e787418caa2", date: "Mar. 21 2021"}
  ]

  const ArticleList = props.articles.map(article => (
    <Col md={6} sm={12} className="p-2">
      <SimpleCard 
        id = {article.id}
        image = {article.image}
        title = {article.title}
        date = {article.date}
        description = {article.description}
        link = {article.link}
      />
    </Col>
    )
  );

  const ChartList = props.charts.map(chart => (
    <Col md={6} sm={12} className="p-2">
      <SimpleCard 
        id = {chart.id}
        image = {chart.image}
        title = {chart.title}
        date = {chart.date}
        description = {chart.description}
        link = {chart.link}
      />
    </Col>
    )
  );

  const InteractiveList = interactives.map(interact => (
    <Row className="p-2">
      <Col ref={componentRef}>
        <Article 
          title={interact.title}
          date={interact.date}
          description={interact.description}
          link={interact.link}
          chart={interact.interactive}
        />
      </Col>
    </Row>
    )
  );

  const handleClick = () => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  return (
    <Container fluid="md">
      <Row>
        <Col>
          <SimpleNav />
        </Col>
      </Row>
      <Intro width={width} handleClick={handleClick}/>
      <div ref={ref}></div>
      <Tabs 
        className="justify-content-center sticky" 
        defaultActiveKey="Charts"
        id="uncontrolled-tab-example"
      >
        <Tab eventKey="Charts" title="Charts">
          <Row className="p-2">
            <Col>
              <Slide data={props.slides}/>
            </Col>
          </Row>
          <Row className="p-2">
            {ChartList}
          </Row>
        </Tab>
        <Tab eventKey="Interactives" title="Interactives">
          {InteractiveList}
        </Tab>
        <Tab eventKey="Articles" title="Articles">
          <Row className="p-2">
            {ArticleList}
          </Row>
        </Tab>
      </Tabs>
      <Row className="mt-2 p-3 text-center footer">
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
