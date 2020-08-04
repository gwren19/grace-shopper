import React from "react";
import { Header } from "semantic-ui-react";
import { Container } from "react-bootstrap";

const Hero = () => {
    return (
        <Container fluid>
            <Container style={{
                background: 'purple',
                height: '800px',
                backgroundImage: `url('/resources/rock_climbing_hanging_crop.jpeg')`, backgroundSize: 'cover'
            }}
            >
                <Header inverted color='orange' textAlign='right' style={{ fontFamily: 'Ultra', fontSize: '6rem', paddingRight: '50px', paddingTop: '50px' }}>The Great Outdoors</Header>
                <Header inverted textAlign='right' style={{ fontSize: '6rem', paddingRight: '50px', paddingTop: '25px', fontFamily: 'Calligraffitti' }}>Adventure Awaits</Header>
            </Container>
        </Container>
    )
}

export default Hero;