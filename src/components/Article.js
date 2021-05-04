import React, { useState } from 'react';
//import Returns from "./Returns";
//import HeatmapExample from "./Heatmap";

//import christmas from '../images/christmas.jpg'

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function SimpleNav(props) {
    return (
        <Card>
        <Card.Header>Featured</Card.Header>
        {/* <Card.Img variant="top" src={christmas} alt="card-image" /> */}
        <Card.Body>
            { props.chart }
            <Card.Title>Special title treatment</Card.Title>
            <Card.Text>
            With supporting text below as a natural lead-in to additional content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
        </Card.Body>
        <Card.Footer className="text-muted">2 days ago</Card.Footer>
        </Card>
    )
}