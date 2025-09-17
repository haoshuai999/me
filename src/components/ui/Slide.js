import Carousel from 'react-bootstrap/Carousel';

export default function Slide(props) {
    return (
        <Carousel data-bs-theme="dark">
            {props.data.map((slide, index) => (
                <Carousel.Item id={`slide-${index}`} key={`slide-${index}`}>
                    <img
                        className="d-block w-100"
                        src={require('../../images/' + slide.image)}
                        alt={`slide-${index}`}
                    />
                </Carousel.Item>
                )
            )}
        </Carousel>
    )
}