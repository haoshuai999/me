import React from 'react';
import Carousel from 'react-bootstrap/Carousel';


export default function Slide(props) {
    return (
        <Carousel>
            {props.data.map((slide, index) => (
                <Carousel.Item id={`slide=${index}`}>
                    <img
                        className="d-block w-100"
                        src={require('../../images/' + slide.image).default}
                        alt="Slide"
                    />
                </Carousel.Item>
                )
            )}
        </Carousel>
    )
}