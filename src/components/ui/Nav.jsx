import { useEffect } from "react";
import * as d3 from "d3";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import resume from "../../static/Resume of Shuai Hao.pdf";

// Beach palette: sand, coral, peach, blush and seafoam tones
const SHELL_COLORS = [
  "#f6d9b8",
  "#f4b6a6",
  "#fbe3d3",
  "#e8c4a0",
  "#f2a9b5",
  "#cfe6dc",
];

// Clam shell in unit coordinates: rounded petals fanning upward from a hinge
function buildShell() {
  const hinge = { x: 0, y: 0.4 };
  // [angle in degrees, petal length]; tall in the middle, shorter toward the sides
  const petalSpecs = [
    [-77, 0.6],
    [77, 0.6],
    [-51, 0.82],
    [51, 0.82],
    [-26, 0.97],
    [26, 0.97],
    [0, 1.05],
  ];

  // Outer petals are drawn first so inner petals overlap them
  const petals = petalSpecs.map(([angleDegrees, length]) => {
    const angle = (angleDegrees * Math.PI) / 180;
    // Unit vectors pointing along the petal's axis and across its width
    const lengthwise = { x: Math.sin(angle), y: -Math.cos(angle) };
    const sideways = { x: Math.cos(angle), y: Math.sin(angle) };
    // Position relative to the hinge, as fractions of the petal length
    const pointOnPetal = (distanceAlong, distanceSide) => ({
      x:
        hinge.x +
        (lengthwise.x * distanceAlong + sideways.x * distanceSide) * length,
      y:
        hinge.y +
        (lengthwise.y * distanceAlong + sideways.y * distanceSide) * length,
    });
    const halfWidth = 0.3;
    const path = new Path2D();
    path.moveTo(hinge.x, hinge.y);

    // Left edge, from the hinge up to the rounded tip
    const leftControl1 = pointOnPetal(0.45, -halfWidth);
    const leftControl2 = pointOnPetal(1, -halfWidth);
    const tip = pointOnPetal(1, 0);
    path.bezierCurveTo(
      leftControl1.x,
      leftControl1.y,
      leftControl2.x,
      leftControl2.y,
      tip.x,
      tip.y,
    );

    // Right edge, from the tip back down to the hinge
    const rightControl1 = pointOnPetal(1, halfWidth);
    const rightControl2 = pointOnPetal(0.45, halfWidth);
    path.bezierCurveTo(
      rightControl1.x,
      rightControl1.y,
      rightControl2.x,
      rightControl2.y,
      hinge.x,
      hinge.y,
    );
    path.closePath();
    return path;
  });

  return { petals };
}

export default function SimpleNav({ width }) {
  // Shell radii scale with the canvas width: 1% to 2% of it
  const onePercentOfWidth = width / 100;
  const randomRadius = d3.randomUniform(
    onePercentOfWidth,
    onePercentOfWidth * 2,
  );
  const randomAngle = d3.randomUniform(-Math.PI, Math.PI);

  let data = Array.from({ length: 200 }, (_, i) => ({
    radius: randomRadius(),
    angle: randomAngle(),
    group: i % SHELL_COLORS.length,
  }));

  useEffect(() => {
    if (width > 500) {
      const canvas = document.getElementById("myCanvas");

      const height = 300;
      const shell = buildShell();
      const context = canvas.getContext("2d");
      const nodes = data.map(Object.create);

      d3.forceSimulation(nodes)
        .alphaTarget(0.3) // stay hot
        .velocityDecay(0.1) // low friction
        .force("x", d3.forceX().strength(0.01))
        .force("y", d3.forceY().strength(0.01))
        .force(
          "collide",
          d3
            .forceCollide()
            .radius((d) => d.radius + 1)
            .iterations(3),
        )
        .force(
          "charge",
          d3.forceManyBody().strength((d, i) => (i ? 0 : (-width * 2) / 3)),
        )
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
          const fill = SHELL_COLORS[d.group];
          const line = d3.color(fill).darker(0.8).formatRgb();
          context.save();
          context.translate(d.x, d.y);
          context.rotate(d.angle);
          context.scale(d.radius * 1.4, d.radius * 1.4);
          context.lineJoin = "round";
          context.lineCap = "round";
          context.lineWidth = 0.04;
          context.fillStyle = fill;
          context.strokeStyle = line;
          for (const petal of shell.petals) {
            context.fill(petal);
            context.stroke(petal);
          }
          context.restore();
        }
        context.restore();
      }

      d3.select(context.canvas)
        .on("touchmove", (event) => event.preventDefault())
        .on("pointermove", pointermoved);
    }
  }, [width]);

  return (
    <>
      <Navbar className="nav-color p-2 rounded" expand="lg">
        <Container className="canvas-container">
          <canvas
            id="myCanvas"
            width={width}
            height={width > 500 ? 300 : 0}
          ></canvas>
          <Navbar.Brand href="#home">Shuai Hao</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href={resume} target="_blank">
                Resume
              </Nav.Link>
              <Nav.Link
                href="https://observablehq.com/@haoshuai999/why-i-choose-data-journalism"
                target="_blank"
              >
                My Story
              </Nav.Link>
              <Nav.Link
                href="https://observablehq.com/@shuaihaofzny"
                target="_blank"
              >
                Observable
              </Nav.Link>
              <Nav.Link href="https://github.com/haoshuai999" target="_blank">
                GitHub
              </Nav.Link>
              <Nav.Link href="mailto: shuaihao@outlook.com" target="_blank">
                Contact
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
