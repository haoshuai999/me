import React, { useState } from 'react';

import Carousel from 'react-bootstrap/Carousel';


export default function Slide(props) {
    return (
        <Carousel>
            {props.data.map(slide => (
                <Carousel.Item id={slide.id}>
                    <img
                    className="d-block w-100"
                    src={require('../images/' + slide.image).default}
                    alt="Slide"
                    />
                    {/* <Carousel.Caption>
                    {slide.title && <h3>First slide label</h3>}
                    {slide.description && <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>}
                    </Carousel.Caption> */}
                </Carousel.Item>
                )
            )}
        </Carousel>
    )
}