import Card from 'react-bootstrap/Card';

export default function SimpleCard(props) {
    return (
        <Card id={props.id}>
        <Card.Header>{props.date}</Card.Header>
        {props.image && <Card.Img variant="top" src={require('../../images/' + props.image)} alt="card-image"/>}
        <Card.Body>
            <Card.Title>{props.title}</Card.Title>
            <Card.Text>
            {props.description}
            </Card.Text>
            <Card.Link href={props.link} target='_blank'>More details</Card.Link>
        </Card.Body>
        </Card>
    )
}