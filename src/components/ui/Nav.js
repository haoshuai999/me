import { useEffect } from 'react';
import * as d3 from "d3";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import resume from "../../static/Resume of Shuai Hao.pdf";

export default function SimpleNav({width}) {
    const k = width / 100;
    const r = d3.randomUniform(k, k * 2);
    const n = 4;

    let data = Array.from({length: 200}, (_, i) => ({r: r(), group: i && (i % n + 1)}));

    useEffect(() => {
        if (width > 500) {
            const canvas = document.getElementById('myCanvas');

            const height = 300;
            const color = d3.scaleOrdinal(d3.schemePastel1);
            const context = canvas.getContext("2d");
            const nodes = data.map(Object.create);

            d3.forceSimulation(nodes)
                .alphaTarget(0.3) // stay hot
                .velocityDecay(0.1) // low friction
                .force("x", d3.forceX().strength(0.01))
                .force("y", d3.forceY().strength(0.01))
                .force("collide", d3.forceCollide().radius(d => d.r + 1).iterations(3))
                .force("charge", d3.forceManyBody().strength((d, i) => i ? 0 : -width * 2 / 3))
                .on("tick", ticked);

            function pointermoved(event) {
                const [x, y] = d3.pointer(event);
                nodes[0].fx = x - width / 2;
                nodes[0].fy = y - height / 2;
            }

            function ticked() {
                context.clearRect(0, 0, width, height);
                context.save();
                context.translate(width / 2, height / 2);
                for (let i = 1; i < nodes.length; ++i) {
                const d = nodes[i];
                context.beginPath();
                context.moveTo(d.x + d.r, d.y);
                context.arc(d.x, d.y, d.r, 0, 2 * Math.PI);
                context.fillStyle = color(d.group);
                context.fill();
                }
                context.restore();
            }

            d3.select(context.canvas)
                .on("touchmove", event => event.preventDefault())
                .on("pointermove", pointermoved);
        }
    }, [width]);

    return (
        <>
            <Navbar className="nav-color p-2 rounded" expand="lg">
                <Container className="canvas-container">
                    <canvas id="myCanvas" width={width} height={width > 500 ? 300 : 0}></canvas>
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