import React from 'react';

import Card from 'react-bootstrap/Card';

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
        </Card>
    )
}