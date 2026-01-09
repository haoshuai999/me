import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';


export default function Intro({width, handleClick}) {
    if(width < 768) {
        return (
            <Row>
                <Col md={4} sm={12} className="p-4 my-auto">
                <Image src={'./images/Profile.jpeg'} alt="profile" fluid />
                </Col>
                <Col md={8} sm={12} className="p-5 my-auto">
                <h1>Hello, world! I'm Shuai Hao.</h1>
                <p>I am a journalist, programmer and designer based in NYC. I graduated from Columbia University's dual degree program in Journalism and Computer Science.</p>
                <p>Love beautiful interactive charts. <br />Love scrollable webpages. <br />Love smooth animations.</p>
                <Button variant="primary" onClick={handleClick}>Portfolios</Button>{' '}
                </Col>
            </Row>
        )
    } else {
        return (
            <Row className="full-height">
                <Col md={4} sm={12} className="p-4 my-auto">
                <Image src={'/images/Profile.jpeg'} alt="profile" fluid />
                </Col>
                <Col md={8} sm={12} className="p-5 my-auto">
                <h1>Hello, world! I'm Shuai Hao.</h1>
                <p>I am a journalist, programmer and designer based in NYC. I graduated from Columbia University's dual degree program in Journalism and Computer Science.</p>
                <p>Love beautiful interactive charts. <br />Love scrollable webpages. <br />Love smooth animations.</p>
                <Button variant="primary" onClick={handleClick}>Portfolios</Button>{' '}
                </Col>
            </Row>
        )
    }
}