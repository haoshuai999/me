import React, { useState } from 'react';
//import Returns from "./Returns";
//import HeatmapExample from "./Heatmap";

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function Article(props) {
    return (
        <Card id={props.id}>
        <Card.Header>{props.date}</Card.Header>
        <Card.Body>
            { props.chart }
            <Card.Title>{ props.title }</Card.Title>
            <Card.Text>
            { props.description }
            </Card.Text>
            <Card.Link href={props.link}>More details</Card.Link>
        </Card.Body>
        {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
        </Card>
    )
}